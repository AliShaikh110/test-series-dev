import { MeiliSearch } from 'meilisearch'

// Initialize MeiliSearch client
const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST!,
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY
})

// Define indices
export const indices = {
  exams: client.index('exams'),
  courses: client.index('courses'),
  colleges: client.index('universityys'),
  articles: client.index('articles')
}

export default client