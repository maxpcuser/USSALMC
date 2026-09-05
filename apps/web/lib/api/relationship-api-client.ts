// Client-side API service for relationships
import { Relationship } from '../types';

export class RelationshipApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async getRelationships(): Promise<Relationship[]> {
    const response = await fetch(`${this.baseUrl}/relationships`);
    if (!response.ok) {
      throw new Error(`Failed to fetch relationships: ${response.statusText}`);
    }
    return response.json();
  }

  async createRelationship(relationship: Omit<Relationship, 'id' | 'createdAt'>): Promise<Relationship> {
    const response = await fetch(`${this.baseUrl}/relationships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(relationship),
    });
    if (!response.ok) {
      throw new Error(`Failed to create relationship: ${response.statusText}`);
    }
    return response.json();
  }

  async deleteRelationship(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/relationships/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete relationship: ${response.statusText}`);
    }
  }
}