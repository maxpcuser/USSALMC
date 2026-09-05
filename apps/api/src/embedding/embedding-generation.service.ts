import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmbeddingService } from './embedding.service';
import { DocumentChunk, Embedding, EmbeddingJob, EmbeddingProvider, EmbeddingModel } from '@prisma/client';

export interface EmbeddingRequest {
  chunkId: number;
  content: string;
  providerId: number;
  modelId: number;
  hash?: string;
}

export interface EmbeddingResult {
  success: boolean;
  embedding?: Embedding;
  error?: string;
  chunkId?: number;
}

@Injectable()
export class EmbeddingGenerationService {
  
  constructor(
    private prisma: PrismaService,
    private embeddingService: EmbeddingService
  ) {}

  /**
   * Generate embeddings for a single chunk
   */
  async generateChunkEmbedding(request: EmbeddingRequest): Promise<EmbeddingResult> {
    try {
      // First check if we already have an embedding for this content hash and version
      const existing = await this.prisma.embedding.findFirst({
        where: {
          chunkId: request.chunkId,
          contentHash: request.hash,
          embeddingVersion: 'v1'
        }
      });

      // If we have a valid embedding, return it instead of recomputing
      if (existing && existing.status === 'Completed') {
        return {
          success: true,
          embedding: existing,
          chunkId: request.chunkId
        };
      }

      // Get the provider and model details
      const [provider, model] = await Promise.all([
        this.prisma.embeddingProvider.findUnique({
          where: { id: request.providerId }
        }),
        this.prisma.embeddingModel.findUnique({
          where: { id: request.modelId }
        })
      ]);

      if (!provider || !model) {
        return {
          success: false,
          error: 'Provider or model not found'
        };
      }

      // Generate the embedding based on provider type
      let vectorData: number[];
      
      switch (provider.providerType) {
        case 'ollama':
          vectorData = await this.generateOllamaEmbedding(request.content, provider.endpointUrl, model.name);
          break;
        case 'openai':
          vectorData = await this.generateOpenAIEmbedding(request.content, provider.endpointUrl, model.name);
          break;
        default:
          return {
            success: false,
            error: `Unsupported provider type: ${provider.providerType}`
          };
      }

      // Create the embedding record
      const embedding = await this.embeddingService.createEmbedding({
        chunkId: request.chunkId,
        providerId: request.providerId,
        modelId: request.modelId,
        vectorDimensions: model.dimensions,
        vectorData: vectorData, // This is handled by Prisma's vector type
        contentHash: request.hash,
        embeddingVersion: 'v1',
        status: 'Completed',
        generatedAt: new Date()
      });

      return {
        success: true,
        embedding,
        chunkId: request.chunkId
      };
    } catch (error) {
      console.error('Error generating embedding:', error);
      return {
        success: false,
        error: error.message || 'Failed to generate embedding'
      };
    }
  }

  /**
   * Generate embeddings in batch for multiple chunks
   */
  async generateBatchEmbeddings(chunks: EmbeddingRequest[]): Promise<EmbeddingResult[]> {
    const results: EmbeddingResult[] = [];
    
    // Process chunks sequentially (can be made concurrent if needed)
    for (const chunk of chunks) {
      const result = await this.generateChunkEmbedding(chunk);
      results.push(result);
    }
    
    return results;
  }

  /**
   * Generate embedding using Ollama API
   */
  private async generateOllamaEmbedding(
    content: string, 
    endpointUrl: string, 
    modelName: string
  ): Promise<number[]> {
    // In a real implementation, this would make an HTTP request to the Ollama service
    // This is a simplified example - actual integration would use axios or fetch
    console.log(`Generating embedding with Ollama for model ${modelName}: ${content.substring(0, 50)}...`);
    
    // Return mock vector data for demonstration
    const mockVectorData = Array.from({ length: 384 }, () => Math.random() * 2 - 1); // Mock 384-dimensional vector
    return mockVectorData;
  }

  /**
   * Generate embedding using OpenAI Compatible API  
   */
  private async generateOpenAIEmbedding(
    content: string, 
    endpointUrl: string, 
    modelName: string
  ): Promise<number[]> {
    // In a real implementation, this would make an HTTP request to the OpenAI compatible service
    // This is a simplified example - actual integration would use axios or fetch
    console.log(`Generating embedding with OpenAI API for model ${modelName}: ${content.substring(0, 50)}...`);
    
    // Return mock vector data for demonstration
    const mockVectorData = Array.from({ length: 1536 }, () => Math.random() * 2 - 1); // Mock 1536-dimensional vector
    return mockVectorData;
  }

  /**
   * Process an embedding job
   */
  async processEmbeddingJob(jobId: number): Promise<{ success: boolean; message?: string }> {
    try {
      // Get the job 
      const job = await this.prisma.embeddingJob.findUnique({
        where: { id: jobId },
        include: {
          document: {
            include: {
              chunks: true
            }
          },
          provider: true,
          model: true
        }
      });

      if (!job) {
        return { success: false, message: 'Embedding job not found' };
      }

      // Update job status to processing
      await this.prisma.embeddingJob.update({
        where: { id: jobId },
        data: {
          status: 'Processing',
          startedAt: new Date()
        }
      });

      // Get chunks that need embedding for this document
      const chunks = job.document.chunks;
      
      if (!chunks || chunks.length === 0) {
        await this.prisma.embeddingJob.update({
          where: { id: jobId },
          data: {
            status: 'Completed',
            completedAt: new Date()
          }
        });
        return { success: true, message: 'No chunks found to process' };
      }

      // Prepare embedding requests for all chunks
      const embeddingRequests: EmbeddingRequest[] = chunks.map(chunk => ({
        chunkId: chunk.id,
        content: chunk.content,
        providerId: job.providerId,
        modelId: job.modelId,
        hash: this.generateContentHash(chunk.content)
      }));

      // Process in batches to avoid overwhelming the system
      const batchSize = 10;
      let completedChunks = 0;
      
      for (let i = 0; i < embeddingRequests.length; i += batchSize) {
        const batch = embeddingRequests.slice(i, i + batchSize);
        
        // In a real implementation this would be made asynchronous 
        const results = await this.generateBatchEmbeddings(batch);
        
        completedChunks += batch.length;
        
        // Update job progress
        await this.prisma.embeddingJob.update({
          where: { id: jobId },
          data: {
            chunksCompleted: completedChunks,
            chunksQueued: embeddingRequests.length
          }
        });
      }

      // Update job status to completed
      await this.prisma.embeddingJob.update({
        where: { id: jobId },
        data: {
          status: 'Completed',
          completedAt: new Date(),
          chunksCompleted: embeddingRequests.length,
          chunksQueued: embeddingRequests.length
        }
      });

      return { success: true, message: `Processed ${embeddingRequests.length} chunks` };
    } catch (error) {
      console.error('Error processing embedding job:', error);
      
      // Update job status to failed
      await this.prisma.embeddingJob.update({
        where: { id: jobId },
        data: {
          status: 'Failed',
          errorMessage: error.message,
          completedAt: new Date()
        }
      });
      
      return { success: false, message: error.message };
    }
  }

  /**
   * Generate a content hash for deduplication
   */
  private generateContentHash(content: string): string {
    // Simple hash function - in production you'd use something more robust
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }

  /**
   * Validate embedding vector data
   */
  validateVectorDimensions(vector: number[], expectedDimensions: number): boolean {
    if (!vector || !Array.isArray(vector)) return false;
    return vector.length === expectedDimensions && vector.every(v => typeof v === 'number');
  }
}
