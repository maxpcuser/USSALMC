import { Injectable } from '@nestjs/common';
import { Job, Queue, Worker } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';

export interface ProcessingQueueJobData {
  documentId: number;
  type: 'cleaning' | 'chunking' | 'classification' | 'embedding' | 'fulltext';
  payload?: any;
}

@Injectable()
export class QueueService {
  private processingQueue: Queue<ProcessingQueueJobData>;
  private worker: Worker<ProcessingQueueJobData>;

  constructor(private prisma: PrismaService) {
    // Initialize the queue (you'll need to connect to Redis)
    this.processingQueue = new Queue<ProcessingQueueJobData>('document-processing', {
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379
      }
    });

    // Set up worker to process jobs
    this.worker = new Worker<ProcessingQueueJobData>(
      'document-processing',
      async (job: Job<ProcessingQueueJobData>) => {
        return await this.processDocumentJob(job.data);
      },
      {
        connection: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT) || 6379
        }
      }
    );
  }

  /**
   * Add document processing job to queue
   */
  async addProcessingJob(data: ProcessingQueueJobData): Promise<void> {
    await this.processingQueue.add('document-processing', data);
  }

  /**
   * Process a document job
   */
  private async processDocumentJob(data: ProcessingQueueJobData): Promise<any> {
    const { documentId, type, payload } = data;
    
    try {
      // Update document status to processing
      await this.prisma.document.update({
        where: { id: documentId },
        data: {
          processingStatus: 'Processing',
          updatedAt: new Date()
        }
      });

      let result;
      
      switch (type) {
        case 'cleaning':
          // Implementation would go here
          result = { status: 'completed', type: 'cleaning' };
          break;
        case 'chunking':
          // Implementation would go here  
          result = { status: 'completed', type: 'chunking' };
          break;
        case 'classification':
          // Implementation would go here
          result = { status: 'completed', type: 'classification' };
          break;
        case 'embedding':
          // Implementation would go here
          result = { status: 'completed', type: 'embedding' };
          break;
        case 'fulltext':
          // Implementation would go here
          result = { status: 'completed', type: 'fulltext' };
          break;
        default:
          throw new Error(`Unknown processing type: ${type}`);
      }
      
      // Update document status to completed
      await this.prisma.document.update({
        where: { id: documentId },
        data: {
          processingStatus: 'Completed',
          updatedAt: new Date()
        }
      });
      
      return result;
    } catch (error) {
      // Update document status to failed
      await this.prisma.document.update({
        where: { id: documentId },
        data: {
          processingStatus: 'Failed',
          errorMessage: error.message,
          updatedAt: new Date()
        }
      });
      
      throw error;
    }
  }

  /**
   * Get queue status
   */
  async getQueueStatus(): Promise<any> {
    const [jobCounts, workers] = await Promise.all([
      this.processingQueue.getJobCounts(),
      this.worker.isRunning() 
    ]);

    return {
      jobCounts,
      isRunning: workers
    };
  }
}
