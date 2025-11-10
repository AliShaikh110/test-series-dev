"use client"
import { useState, useEffect } from 'react';

interface IPLocation {
  ip: string;
  city: string;
  region: string;
  region_code: string;
  country_name: string;
  country_code: string;
  latitude: number;
  longitude: number;
  postal: string;
}

interface LocationState {
  data: IPLocation | null;
  loading: boolean;
  error: string | null;
}

export const useIPLocation = () => {
  const [state, setState] = useState<LocationState>({
    data: null,
    loading: true,
    error: null
  });

  const getLocation = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // This single API call will automatically detect IP and return location
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      if (data.error) {
        throw new Error(data.reason || 'Failed to get location');
      }

      setState({
        data,
        loading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch location'
      }));
    }
  };

  // Load location data on mount
  useEffect(() => {
    // Check if we have cached data
    const cached = localStorage.getItem('user_location');
    const cacheTimestamp = localStorage.getItem('location_timestamp');
    
    if (cached && cacheTimestamp) {
      const cacheAge = Date.now() - Number(cacheTimestamp);
      // Use cache if it's less than 1 hour old
      if (cacheAge < 3600000) {
        setState({
          data: JSON.parse(cached),
          loading: false,
          error: null
        });
        return;
      }
    }
    
    getLocation();
  }, []);

  // Cache the location data when it updates
  useEffect(() => {
    if (state.data) {
      localStorage.setItem('user_location', JSON.stringify(state.data));
      localStorage.setItem('location_timestamp', Date.now().toString());
    }
  }, [state.data]);

  return {
    ...state.data,
    loading: state.loading,
    error: state.error,
    refreshLocation: getLocation
  };
};

export default useIPLocation;
