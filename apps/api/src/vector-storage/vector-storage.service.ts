import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Embedding, VectorIndexStatistic } from '@prisma/client';

@Injectable()
export class VectorStorageService {
  
  constructor(private prisma: PrismaService) {}

  /**
   * Store an embedding vector
   */
  async storeEmbedding(embedding: Partial<Embedding>): Promise<Embedding> {
    try {
      // Validate that we have the required fields
      if (!embedding.chunkId || !embedding.providerId || !embedding.modelId || !embedding.vectorData) {
        throw new Error('Missing required embedding fields: chunkId, providerId, modelId, vectorData');
      }

      // Create or update the embedding
      const created = await this.prisma.embedding.upsert({
        where: {
          chunkId: embedding.chunkId
        },
        update: {
          ...embedding,
          updatedAt: new Date()
        },
        create: {
          ...embedding,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      // Update vector index statistics
      await this.updateVectorIndexStatistics();

      return created;
    } catch (error) {
      console.error('Error storing embedding:', error);
      throw error;
    }
  }

  /**
   * Retrieve an embedding by chunk ID
   */
  async getEmbeddingByChunkId(chunkId: number): Promise<Embedding | null> {
    return await this.prisma.embedding.findUnique({
      where: { chunkId }
    });
  }

  /**
   * Retrieve embeddings for multiple chunks
   */
  async getEmbeddingsByChunkIds(chunkIds: number[]): Promise<Embedding[]> {
    return await this.prisma.embedding.findMany({
      where: {
        chunkId: {
          in: chunkIds
        }
      }
    });
  }

  /**
   * Get all embeddings for a document
   */
  async getEmbeddingsByDocumentId(documentId: number): Promise<Embedding[]> {
    try {
      const chunks = await this.prisma.documentChunk.findMany({
        where: { documentId }
      });

      const chunkIds = chunks.map(chunk => chunk.id);
      
      if (chunkIds.length === 0) {
        return [];
      }

      return await this.getEmbeddingsByChunkIds(chunkIds);
    } catch (error) {
      console.error('Error getting embeddings by document ID:', error);
      throw error;
    }
  }

  /**
   * Update vector index statistics
   */
  async updateVectorIndexStatistics(): Promise<VectorIndexStatistic> {
    try {
      // Get current statistics or create new ones
      let stats = await this.prisma.vectorIndexStatistic.findFirst();
      
      if (!stats) {
        stats = await this.prisma.vectorIndexStatistic.create({
          data: {}
        });
      }

      // Count total vectors
      const totalVectors = await this.prisma.embedding.count();
      
      // Count completed vectors
      const indexedVectors = await this.prisma.embedding.count({
        where: { status: 'Completed' }
      });
      
      // Count failed vectors
      const failedVectors = await this.prisma.embedding.count({
        where: { status: 'Failed' }
      });
      
      // Get average vector dimensions (approximate)
      const avgDimensions = await this.prisma.embedding.aggregate({
        _avg: { vectorDimensions: true },
        where: { status: 'Completed' }
      });

      // Update the statistics
      const updatedStats = await this.prisma.vectorIndexStatistic.update({
        where: { id: stats.id },
        data: {
          totalVectors,
          indexedVectors,
          failedVectors,
          averageDimensions: Math.round(avgDimensions._avg.vectorDimensions || 0),
          lastIndexUpdate: new Date()
        }
      });

      return updatedStats;
    } catch (error) {
      console.error('Error updating vector index statistics:', error);
      throw error;
    }
  }

  /**
   * Get vector index statistics
   */
  async getVectorIndexStatistics(): Promise<VectorIndexStatistic | null> {
    return await this.prisma.vectorIndexStatistic.findFirst();
  }

  /**
   * Validate an embedding vector
   */
  async validateEmbeddingVector(embedding: Embedding): Promise<{ valid: boolean; errors?: string[] }> {
    const errors: string[] = [];
    
    // Validate required fields
    if (!embedding.chunkId) errors.push('Missing chunkId');
    if (!embedding.providerId) errors.push('Missing providerId');
    if (!embedding.modelId) errors.push('Missing modelId');
    if (!embedding.vectorData || !Array.isArray(embedding.vectorData)) {
      errors.push('Invalid vectorData - must be an array');
    } else {
      // Validate that all entries in the vector are numbers
      const hasNonNumbers = embedding.vectorData.some(val => typeof val !== 'number');
      if (hasNonNumbers) {
        errors.push('Vector data contains non-numeric values');
      }
    }

    // Validate dimensions
    if (!embedding.vectorDimensions || embedding.vectorDimensions <= 0) {
      errors.push('Invalid vectorDimensions');
    } else if (embedding.vectorData && embedding.vectorData.length !== embedding.vectorDimensions) {
      errors.push(`Vector dimension mismatch: expected ${embedding.vectorDimensions}, got ${embedding.vectorData.length}`);
    }

    // Validate that it's a valid status
    const validStatuses = ['Pending', 'Queued', 'Processing', 'Completed', 'Failed', 'Skipped', 'Outdated'];
    if (!validStatuses.includes(embedding.status)) {
      errors.push(`Invalid status: ${embedding.status}`);
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined
    };
  }

  /**
   * Get embeddings with similarity search (mock implementation)
   */
  async findSimilarEmbeddings(queryVector: number[], topK: number = 10): Promise<Embedding[]> {
    // In a real implementation, this would use pgvector's similarity functions
    console.log(`Searching for ${topK} similar embeddings to vector of length ${queryVector.length}`);
    
    // Mock response - return first few embeddings for demo
    const allEmbeddings = await this.prisma.embedding.findMany({
      take: topK,
      orderBy: { createdAt: 'asc' }
    });
    
    return allEmbeddings;
  }

  /**
   * Delete embeddings for a chunk
   */
  async deleteEmbedding(chunkId: number): Promise<Embedding> {
    try {
      const deleted = await this.prisma.embedding.delete({
        where: { chunkId }
      });

      // Update statistics
      await this.updateVectorIndexStatistics();

      return deleted;
    } catch (error) {
      console.error('Error deleting embedding:', error);
      throw error;
    }
  }

  /**
   * Batch store embeddings
   */
  async batchStoreEmbeddings(embeddings: Partial<Embedding>[]): Promise<Embedding[]> {
    try {
      const stored: Embedding[] = [];
      
      for (const embedding of embeddings) {
        const result = await this.storeEmbedding(embedding);
        stored.push(result);
      }
      
      // Update statistics after batch
      await this.updateVectorIndexStatistics();
      
      return stored;
    } catch (error) {
      console.error('Error in batch store embeddings:', error);
      throw error;
    }
  }

  /**
   * Get all embeddings with pagination (mock - real implementation would use database features)
   */
  async getAllEmbeddings(limit: number = 100, offset: number = 0): Promise<Embedding[]> {
    // Mock implementation for demonstration
    console.log(`Fetching embeddings with limit ${limit}, offset ${offset}`);
    
    return await this.prisma.embedding.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'asc' }
    });
  }

  /**
   * Get embedding job statistics
   */
  async getEmbeddingJobStats(): Promise<any> {
    try {
      const [totalJobs, completedJobs, failedJobs] = await Promise.all([
        this.prisma.embeddingJob.count(),
        this.prisma.embeddingJob.count({ where: { status: 'Completed' } }),
        this.prisma.embeddingJob.count({ where: { status: 'Failed' } })
      ]);

      return {
        totalJobs,
        completedJobs,
        failedJobs,
        pendingJobs: totalJobs - completedJobs - failedJobs
      };
    } catch (error) {
      console.error('Error getting embedding job stats:', error);
      throw error;
    }
  }

  /**
   * Update embedding status
   */
  async updateEmbeddingStatus(chunkId: number, status: string): Promise<Embedding> {
    try {
      const updated = await this.prisma.embedding.update({
        where: { chunkId },
        data: { 
          status,
          updatedAt: new Date()
        }
      });

      // Update statistics
      await this.updateVectorIndexStatistics();

      return updated;
    } catch (error) {
      console.error('Error updating embedding status:', error);
      throw error;
    }
  }
}
