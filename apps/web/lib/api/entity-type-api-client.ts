// Client-side API service for entity types
import { EntityType } from '../types';

export class EntityTypeApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async getEntityTypes(): Promise<EntityType[]> {
    const response = await fetch(`${this.baseUrl}/entity-types`);
    if (!response.ok) {
      throw new Error(`Failed to fetch entity types: ${response.statusText}`);
    }
    return response.json();
  }

  async getEntityTypeById(id: number): Promise<EntityType> {
    const response = await fetch(`${this.baseUrl}/entity-types/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch entity type: ${response.statusText}`);
    }
    return response.json();
  }

  async createEntityType(entityType: Omit<EntityType, 'id' | 'createdAt' | 'updatedAt'>): Promise<EntityType> {
    const response = await fetch(`${this.baseUrl}/entity-types`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entityType),
    });
    if (!response.ok) {
      throw new Error(`Failed to create entity type: ${response.statusText}`);
    }
    return response.json();
  }

  async updateEntityType(id: number, entityType: Partial<EntityType>): Promise<EntityType> {
    const response = await fetch(`${this.baseUrl}/entity-types/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entityType),
    });
    if (!response.ok) {
      throw new Error(`Failed to update entity type: ${response.statusText}`);
    }
    return response.json();
  }

  async deleteEntityType(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/entity-types/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete entity type: ${response.statusText}`);
    }
  }
}