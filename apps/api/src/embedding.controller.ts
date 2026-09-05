import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { EmbeddingService } from './embedding/embedding.service';
import { EmbeddingGenerationService } from './embedding/embedding-generation.service';
import { VectorStorageService } from './vector-storage/vector-storage.service';
import { EmbeddingProviderService } from './embedding-provider/embedding-provider.service';

@Controller('embeddings')
export class EmbeddingController {
  
  constructor(
    private readonly embeddingService: EmbeddingService,
    private readonly embeddingGenerationService: EmbeddingGenerationService,
    private readonly vectorStorageService: VectorStorageService,
    private readonly providerService: EmbeddingProviderService
  ) {}

  /**
   * Get all embeddings (paginated)
   */
  @Get()
  async getAllEmbeddings(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0
  ) {
    return await this.vectorStorageService.getAllEmbeddings(limit, offset);
  }

  /**
   * Get embedding by chunk ID
   */
  @Get(':chunkId')
  async getEmbeddingByChunkId(@Param('chunkId') chunkId: number) {
    return await this.vectorStorageService.getEmbeddingByChunkId(chunkId);
  }

  /**
   * Get all embeddings for a document
   */
  @Get('document/:documentId')
  async getDocumentEmbeddings(@Param('documentId') documentId: number) {
    return await this.vectorStorageService.getEmbeddingsByDocumentId(documentId);
  }

  /**
   * Generate embedding for content
   */
  @Post('generate')
  async generateEmbedding(@Body() body: { 
    content: string; 
    providerName?: string; 
    modelName?: string;
    chunkId?: number;
  }) {
    // In a real implementation, this would call the generation service with proper provider/model resolution
    const mockResult = {
      success: true,
      message: 'Embedding generated successfully (mock)',
      data: {
        content: body.content.substring(0, 50) + '...',
        vector: Array.from({ length: 384 }, () => Math.random() * 2 - 1)
      }
    };

    return mockResult;
  }

  /**
   * Get vector index statistics
   */
  @Get('stats')
  async getVectorStats() {
    const stats = await this.vectorStorageService.getVectorIndexStatistics();
    const jobStats = await this.vectorStorageService.getEmbeddingJobStats();
    
    return {
      ...stats,
      jobStats
    };
  }

  /**
   * Get all registered providers
   */
  @Get('providers')
  async getProviders() {
    return await this.providerService.listProviders();
  }

  /**
   * Register a new provider
   */
  @Post('providers')
  async registerProvider(@Body() body: {
    name: string;
    providerType: 'ollama' | 'openai' | 'custom';
    endpointUrl?: string;
    configuration?: any;
  }) {
    return await this.providerService.registerProvider(body);
  }

  /**
   * Health check for a specific provider
   */
  @Get('providers/:name/health')
  async providerHealth(@Param('name') name: string) {
    return await this.providerService.healthCheck(name);
  }

  /**
   * Get models for a provider
   */
  @Get('providers/:name/models')
  async getProviderModels(@Param('name') name: string) {
    return await this.providerService.getProviderModels(name);
  }
}
