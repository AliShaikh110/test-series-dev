// src/services/viewTrackingService.ts
import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds
const BATCH_INTERVAL = 30000;   // 30 seconds for batching requests



interface BatchItem {
  articleId: string;
  timestamp: number;
}

class ViewTrackingService {
  private static instance: ViewTrackingService;
  private axiosInstance;
  private memoryCache: Map<string, { views: number; timestamp: number }>;
  private batchQueue: BatchItem[];
  private batchTimeout: NodeJS.Timeout | null;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: STRAPI_URL,
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    this.memoryCache = new Map();
    this.batchQueue = [];
    this.batchTimeout = null;
    this.setupBatchProcessing();
  }

  public static getInstance(): ViewTrackingService {
    if (!ViewTrackingService.instance) {
      ViewTrackingService.instance = new ViewTrackingService();
    }
    return ViewTrackingService.instance;
  }

  private getLocalStorageKey(articleId: string): string {
    return `view_track_${articleId}`;
  }

  private isRecentlyViewed(articleId: string): boolean {
    // Check memory cache first
    const memCache = this.memoryCache.get(articleId);
    if (memCache && Date.now() - memCache.timestamp < CACHE_DURATION) {
      return true;
    }

    // Fall back to localStorage for client-side
    if (typeof window === 'undefined') return false;
    
    const key = this.getLocalStorageKey(articleId);
    const stored = localStorage.getItem(key);
    
    if (!stored) return false;

    const { timestamp } = JSON.parse(stored);
    return Date.now() - timestamp < CACHE_DURATION;
  }

  private setRecentlyViewed(articleId: string, views: number): void {
    // Update memory cache
    this.memoryCache.set(articleId, {
      views,
      timestamp: Date.now()
    });

    // Update localStorage for client-side
    if (typeof window === 'undefined') return;
    
    const key = this.getLocalStorageKey(articleId);
    localStorage.setItem(key, JSON.stringify({ 
      timestamp: Date.now(),
      views 
    }));
  }

  private setupBatchProcessing(): void {
    const processBatch = async () => {
      if (this.batchQueue.length === 0) return;

      const batchToProcess = [...this.batchQueue];
      this.batchQueue = [];

      // Group by articleId to avoid duplicate updates
      const groupedUpdates = batchToProcess.reduce((acc, item) => {
        acc[item.articleId] = (acc[item.articleId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Process each grouped update
      for (const [articleId, incrementBy] of Object.entries(groupedUpdates)) {
        try {
          const existingView = await this.getArticleViews(articleId);
          const trackId = await this.getOrCreateTrackId(articleId);
          
          if (trackId) {
            await this.axiosInstance.put(`/api/view-tracks/${trackId}`, {
              data: {
                total_views: existingView + incrementBy
              }
            });
          }
        } catch (error) {
          console.error(`Error processing batch update for article ${articleId}:`, error);
        }
      }
    };

    // Set up periodic batch processing
    setInterval(processBatch, BATCH_INTERVAL);
  }

  private async getOrCreateTrackId(articleId: string): Promise<string | null> {
    try {
      const existing = await this.axiosInstance.get('/api/view-tracks', {
        params: {
          filters: {
            item_id: articleId,
            contentt_type: 'articles'
          }
        }
      });

      if (existing.data.data.length > 0) {
        return existing.data.data[0].id;
      }

      const created = await this.axiosInstance.post('/api/view-tracks', {
        data: {
          item_id: articleId,
          contentt_type: 'articles',
          total_views: 0
        }
      });

      return created.data.data.id;
    } catch (error) {
      console.error('Error getting/creating track ID:', error);
      return null;
    }
  }

  public async trackArticleView(articleId: string): Promise<number> {
    try {
      if (this.isRecentlyViewed(articleId)) {
        const cachedData = this.memoryCache.get(articleId);
        return cachedData?.views || 0;
      }

      // Add to batch queue
      this.batchQueue.push({
        articleId,
        timestamp: Date.now()
      });

      // Get current views for immediate feedback
      const currentViews = await this.getArticleViews(articleId);
      
      // Update cache with incremented value
      this.setRecentlyViewed(articleId, currentViews + 1);
      
      return currentViews + 1;
    } catch (error) {
      console.error('Error tracking view:', error);
      return 0;
    }
  }

  public async getArticleViews(articleId: string): Promise<number> {
    try {
      // Check memory cache first
      const cachedData = this.memoryCache.get(articleId);
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        return cachedData.views;
      }

      const response = await this.axiosInstance.get('/api/view-tracks', {
        params: {
          filters: {
            item_id: articleId,
            contentt_type: 'articles'
          }
        }
      });

      const viewData = response.data.data[0];
      const views = viewData ? viewData.attributes.total_views : 0;
      
      // Update cache
      this.setRecentlyViewed(articleId, views);
      
      return views;
    } catch (error) {
      console.error('Error fetching views:', error);
      return 0;
    }
  }

  public formatViews(views: number): string {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  }
}

// Export singleton instance
export const viewTrackingService = ViewTrackingService.getInstance();

// Export individual methods for backward compatibility
export const { trackArticleView, getArticleViews, formatViews } = viewTrackingService;