// Client-side API service for sources
import { Source } from '../types';

export class SourceApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async getSources(): Promise<Source[]> {
    const response = await fetch(`${this.baseUrl}/sources`);
    if (!response.ok) {
      throw new Error(`Failed to fetch sources: ${response.statusText}`);
    }
    return response.json();
  }

  async getSourceById(id: number): Promise<Source> {
    const response = await fetch(`${this.baseUrl}/sources/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch source: ${response.statusText}`);
    }
    return response.json();
  }

  async createSource(source: Omit<Source, 'id' | 'createdAt' | 'updatedAt'>): Promise<Source> {
    const response = await fetch(`${this.baseUrl}/sources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(source),
    });
    if (!response.ok) {
      throw new Error(`Failed to create source: ${response.statusText}`);
    }
    return response.json();
  }

  async updateSource(id: number, source: Partial<Source>): Promise<Source> {
    const response = await fetch(`${this.baseUrl}/sources/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(source),
    });
    if (!response.ok) {
      throw new Error(`Failed to update source: ${response.statusText}`);
    }
    return response.json();
  }

  async deleteSource(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/sources/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete source: ${response.statusText}`);
    }
  }
}