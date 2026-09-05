import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmbeddingGenerationService } from './embedding-generation.service';
import { Queue, Job } from 'bullmq';
import { EmbeddingJobData, EmbeddingRequest } from './embedding.service';

@Injectable()
export class EmbeddingQueueService {
  
  private embeddingQueue: Queue<EmbeddingRequest>;
  
  constructor(
    private prisma: PrismaService,
    private embeddingGenerationService: EmbeddingGenerationService
  ) {
    // Initialize the queue - in a real system this would connect to Redis
    // For now we'll use mock implementation for demo purposes
    console.log('Embedding queue initialized (mock)');
  }

  /**
   * Add chunks for embedding generation to the queue
   */
  async addToQueue(requests: EmbeddingRequest[]): Promise<void> {
    // In a real environment, this would add jobs to Redis queue
    // For now, we'll process them directly 
    console.log(`Adding ${requests.length} requests to embedding queue`);
    
    for (const request of requests) {
      await this.processQueueItem(request);
    }
  }

  /**
   * Process an individual item from the queue
   */
  private async processQueueItem(request: EmbeddingRequest): Promise<void> {
    try {
      // Generate the embedding for this specific chunk
      const result = await this.embeddingGenerationService.generateChunkEmbedding(request);
      
      if (result.success) {
        console.log(`Successfully embedded chunk ${request.chunkId}`);
      } else {
        console.error(`Failed to embed chunk ${request.chunkId}: ${result.error}`);
      }
    } catch (error) {
      console.error('Error processing queue item:', error);
    }
  }

  /**
   * Process a job from the queue
   */
  async processJob(jobId: number): Promise<{ success: boolean; message?: string }> {
    try {
      // In the real queue, this would be handled by the worker
      // For demo we're calling the generation service directly
      
      const result = await this.embeddingGenerationService.processEmbeddingJob(jobId);
      
      return result;
    } catch (error) {
      console.error('Error processing job:', error);
      return { success: false, message: error.message };
    }
  }

  /**
   * Get queue status
   */
  async getQueueStatus(): Promise<any> {
    // Return mock status for demonstration
    const status = {
      waiting: 0,
      active: 0,
      delayed: 0,
      completed: 0,
      failed: 0,
      paused: false
    };
    
    return status;
  }

  /**
   * Add a job to the queue
   */
  async addJob(jobData: EmbeddingRequest): Promise<void> {
    // Mock implementation - in real world you'd push this to redis queue
    console.log('Adding embedding job to queue:', jobData.chunkId);
    
    await this.processQueueItem(jobData);
  }

  /**
   * Process batch of embedding jobs
   */
  async processBatchJobs(jobIds: number[]): Promise<{ success: boolean; processed: number; errors: string[] }> {
    const errors: string[] = [];
    let processed = 0;
    
    for (const jobId of jobIds) {
      try {
        const result = await this.processJob(jobId);
        if (!result.success) {
          errors.push(result.message || `Failed to process job ${jobId}`);
        } else {
          processed++;
        }
      } catch (error) {
        errors.push(`Error processing job ${jobId}: ${error.message}`);
      }
    }
    
    return { success: errors.length === 0, processed, errors };
  }
}
