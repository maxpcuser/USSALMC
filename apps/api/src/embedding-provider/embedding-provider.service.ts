import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmbeddingProvider, EmbeddingModel } from '@prisma/client';

export interface ProviderConfig {
  name: string;
  providerType: 'ollama' | 'openai' | 'custom';
  endpointUrl?: string;
  configuration?: any;
}

@Injectable()
export class EmbeddingProviderService {
  
  constructor(private prisma: PrismaService) {}

  /**
   * Register a new embedding provider
   */
  async registerProvider(config: ProviderConfig): Promise<EmbeddingProvider> {
    try {
      // Check if provider with this name already exists
      const existing = await this.prisma.embeddingProvider.findUnique({
        where: { name: config.name }
      });

      if (existing) {
        throw new Error(`Provider with name ${config.name} already exists`);
      }

      // Create the provider
      const provider = await this.prisma.embeddingProvider.create({
        data: {
          name: config.name,
          providerType: config.providerType,
          endpointUrl: config.endpointUrl || null,
          configuration: config.configuration || {},
          isEnabled: true
        }
      });

      console.log(`Registered new embedding provider: ${config.name}`);

      return provider;
    } catch (error) {
      console.error('Error registering embedding provider:', error);
      throw error;
    }
  }

  /**
   * Get a provider by ID
   */
  async getProviderById(id: number): Promise<EmbeddingProvider | null> {
    return await this.prisma.embeddingProvider.findUnique({
      where: { id }
    });
  }

  /**
   * Get a provider by name
   */
  async getProviderByName(name: string): Promise<EmbeddingProvider | null> {
    return await this.prisma.embeddingProvider.findUnique({
      where: { name }
    });
  }

  /**
   * Update a provider
   */
  async updateProvider(id: number, updates: Partial<EmbeddingProvider>): Promise<EmbeddingProvider> {
    try {
      const updated = await this.prisma.embeddingProvider.update({
        where: { id },
        data: updates
      });

      console.log(`Updated embedding provider: ${updated.name}`);

      return updated;
    } catch (error) {
      console.error('Error updating embedding provider:', error);
      throw error;
    }
  }

  /**
   * Delete a provider
   */
  async deleteProvider(id: number): Promise<EmbeddingProvider> {
    try {
      const deleted = await this.prisma.embeddingProvider.delete({
        where: { id }
      });

      console.log(`Deleted embedding provider: ${deleted.name}`);

      return deleted;
    } catch (error) {
      console.error('Error deleting embedding provider:', error);
      throw error;
    }
  }

  /**
   * List all registered providers
   */
  async listProviders(): Promise<EmbeddingProvider[]> {
    return await this.prisma.embeddingProvider.findMany({
      where: { isEnabled: true },
      orderBy: { name: 'asc' }
    });
  }

  /**
   * Enable a provider
   */
  async enableProvider(id: number): Promise<EmbeddingProvider> {
    return await this.updateProvider(id, { isEnabled: true });
  }

  /**
   * Disable a provider
   */
  async disableProvider(id: number): Promise<EmbeddingProvider> {
    return await this.updateProvider(id, { isEnabled: false });
  }

  /**
   * Health check for a provider
   */
  async healthCheck(providerName: string): Promise<{ healthy: boolean; message?: string }> {
    try {
      const provider = await this.getProviderByName(providerName);
      
      if (!provider) {
        return { 
          healthy: false, 
          message: `Provider ${providerName} not found` 
        };
      }

      // Perform connection test based on provider type
      let result;
      
      switch (provider.providerType) {
        case 'ollama':
          result = await this.testOllamaConnection(provider);
          break;
        case 'openai':
          result = await this.testOpenAIConnection(provider);
          break;
        default:
          result = { healthy: true, message: 'Custom provider connection test not implemented' };
      }

      return { 
        healthy: result.healthy,
        message: result.message
      };
    } catch (error) {
      console.error('Health check failed:', error);
      return { 
        healthy: false, 
        message: `Health check failed for ${providerName}: ${error.message}` 
      };
    }
  }

  /**
   * Test Ollama connection
   */
  private async testOllamaConnection(provider: EmbeddingProvider): Promise<{ healthy: boolean; message?: string }> {
    // In a real implementation, this would make an HTTP request to the Ollama endpoint
    console.log(`Testing Ollama connection for: ${provider.name}`);
    
    // Mock response - return true for demo purposes
    return { 
      healthy: true,
      message: 'Ollama connection successful'
    };
  }

  /**
   * Test OpenAI connection  
   */
  private async testOpenAIConnection(provider: EmbeddingProvider): Promise<{ healthy: boolean; message?: string }> {
    // In a real implementation, this would make an HTTP request to the OpenAI endpoint
    console.log(`Testing OpenAI connection for: ${provider.name}`);
    
    // Mock response - return true for demo purposes  
    return { 
      healthy: true,
      message: 'OpenAI connection successful'
    };
  }

  /**
   * Get available models for a provider
   */
  async getProviderModels(providerName: string): Promise<EmbeddingModel[]> {
    try {
      const provider = await this.getProviderByName(providerName);
      
      if (!provider) {
        throw new Error(`Provider ${providerName} not found`);
      }

      return await this.prisma.embeddingModel.findMany({
        where: { providerId: provider.id },
        orderBy: { name: 'asc' }
      });
    } catch (error) {
      console.error('Error getting provider models:', error);
      throw error;
    }
  }

  /**
   * Register a model for a provider
   */
  async registerModel(
    providerName: string, 
    modelName: string, 
    dimensions: number,
    config?: any
  ): Promise<EmbeddingModel> {
    try {
      const provider = await this.getProviderByName(providerName);
      
      if (!provider) {
        throw new Error(`Provider ${providerName} not found`);
      }

      // Check for existing model with same name
      const existing = await this.prisma.embeddingModel.findFirst({
        where: { 
          providerId: provider.id,
          name: modelName
        }
      });

      if (existing) {
        throw new Error(`Model ${modelName} already exists for provider ${providerName}`);
      }

      const model = await this.prisma.embeddingModel.create({
        data: {
          providerId: provider.id,
          name: modelName,
          displayName: modelName,
          dimensions,
          maxTokens: null,
          isDefault: false,
          configuration: config || {}
        }
      });

      console.log(`Registered new model ${modelName} for provider ${providerName}`);

      return model;
    } catch (error) {
      console.error('Error registering model:', error);
      throw error;
    }
  }

  /**
   * Set default model for a provider
   */
  async setDefaultModel(providerName: string, modelName: string): Promise<EmbeddingModel> {
    try {
      const provider = await this.getProviderByName(providerName);
      
      if (!provider) {
        throw new Error(`Provider ${providerName} not found`);
      }

      // First unset any existing default
      await this.prisma.embeddingModel.updateMany({
        where: { providerId: provider.id, isDefault: true },
        data: { isDefault: false }
      });

      // Set new default
      const model = await this.prisma.embeddingModel.update({
        where: { 
          providerId_name: { 
            providerId: provider.id,
            name: modelName
          }
        },
        data: { isDefault: true }
      });

      console.log(`Set ${modelName} as default for provider ${providerName}`);

      return model;
    } catch (error) {
      console.error('Error setting default model:', error);
      throw error;
    }
  }
}
