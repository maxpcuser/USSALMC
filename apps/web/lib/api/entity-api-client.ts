// Client-side API service for entities
import { Entity } from '../types';

export class EntityApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async getEntities(): Promise<Entity[]> {
    const response = await fetch(`${this.baseUrl}/entities`);
    if (!response.ok) {
      throw new Error(`Failed to fetch entities: ${response.statusText}`);
    }
    return response.json();
  }

  async getEntityById(id: number): Promise<Entity> {
    const response = await fetch(`${this.baseUrl}/entities/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch entity: ${response.statusText}`);
    }
    return response.json();
  }

  async createEntity(entity: Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>): Promise<Entity> {
    const response = await fetch(`${this.baseUrl}/entities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entity),
    });
    if (!response.ok) {
      throw new Error(`Failed to create entity: ${response.statusText}`);
    }
    return response.json();
  }

  async updateEntity(id: number, entity: Partial<Entity>): Promise<Entity> {
    const response = await fetch(`${this.baseUrl}/entities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entity),
    });
    if (!response.ok) {
      throw new Error(`Failed to update entity: ${response.statusText}`);
    }
    return response.json();
  }

  async deleteEntity(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/entities/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete entity: ${response.statusText}`);
    }
  }
}