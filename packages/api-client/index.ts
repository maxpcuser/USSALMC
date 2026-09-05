
// API Client for USSA Knowledge Core
import axios, { AxiosInstance } from 'axios';

export class KnowledgeCoreAPIClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string, apiKey?: string) {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000
    });

    if (apiKey) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
    }
    
    // Add request interceptor for logging
    this.client.interceptors.request.use(
      config => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    
    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
      }
    );
  }

  // Placeholder methods - will be expanded in future phases
  async search(query: string) {
    return this.client.get(`/api/v1/search?q=${encodeURIComponent(query)}`);
  }

  async getContext(entityId: string) {
    return this.client.post(`/api/v1/context`, { entityId });
  }

  async getEntities() {
    return this.client.get(`/api/v1/entities`);
  }

  async getDocuments() {
    return this.client.get(`/api/v1/documents`);
  }

  async getRelationships() {
    return this.client.get(`/api/v1/relationships`);
  }
}
