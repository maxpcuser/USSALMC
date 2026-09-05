// Client-side API service for settings
import { ApplicationSetting } from '../types';

export class SettingsApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async getSettings(): Promise<ApplicationSetting[]> {
    const response = await fetch(`${this.baseUrl}/settings`);
    if (!response.ok) {
      throw new Error(`Failed to fetch settings: ${response.statusText}`);
    }
    return response.json();
  }

  async updateSettings(settings: Partial<ApplicationSetting>): Promise<ApplicationSetting> {
    const response = await fetch(`${this.baseUrl}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    if (!response.ok) {
      throw new Error(`Failed to update settings: ${response.statusText}`);
    }
    return response.json();
  }
}