// Create API service layer for web application
import { Source } from '../types';

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getSources(): Promise<Source[]> {
    const response = await fetch(`${this.baseUrl}/sources`);
    return response.json();
  }

  async getSourceById(id: number): Promise<Source> {
    const response = await fetch(`${this.baseUrl}/sources/${id}`);
    return response.json();
  }
}