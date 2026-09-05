import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Embedding, EmbeddingJob, EmbeddingProvider, EmbeddingModel, VectorIndexStatistic } from '@prisma/client';

export interface EmbeddingData {
  id?: number;
  chunkId: number;
  providerId: number;
  modelId: number;
  vectorDimensions: number;
  vectorData: number[]; // This will be stored as a vector type in PostgreSQL
  contentHash: string;
  embeddingVersion: string;
  status: 'Pending' | 'Queued' | 'Processing' | 'Completed' | 'Failed' | 'Skipped' | 'Outdated';
  generatedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EmbeddingJobData {
  id?: number;
  documentId: number;
  status: 'Pending' | 'Queued' | 'Processing' | 'Completed' | 'Failed' | 'Skipped' | 'Outdated';
  providerId: number;
  modelId: number;
  chunksQueued: number;
  chunksCompleted: number;
  chunksFailed: number;
  startedAt?: Date;
  completedAt?: Date;
  errorMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable()
export class EmbeddingService {
  constructor(private prisma: PrismaService) {}

  // Embedding operations
  async createEmbedding(embeddingData: Partial<EmbeddingData>): Promise<Embedding> {
    return await this.prisma.embedding.create({
      data: embeddingData as any,
    });
  }

  async getEmbeddingById(id: number): Promise<Embedding | null> {
    return await this.prisma.embedding.findUnique({
      where: { id },
    });
  }

  async updateEmbedding(id: number, embeddingData: Partial<EmbeddingData>): Promise<Embedding> {
    return await this.prisma.embedding.update({
      where: { id },
      data: embeddingData as any,
    });
  }

  async deleteEmbedding(id: number): Promise<Embedding> {
    return await this.prisma.embedding.delete({
      where: { id },
    });
  }

  // Embedding job operations
  async createEmbeddingJob(jobData: Partial<EmbeddingJobData>): Promise<EmbeddingJob> {
    return await this.prisma.embeddingJob.create({
      data: jobData as any,
    });
  }

  async getEmbeddingJobById(id: number): Promise<EmbeddingJob | null> {
    return await this.prisma.embeddingJob.findUnique({
      where: { id },
    });
  }

  async updateEmbeddingJob(id: number, jobData: Partial<EmbeddingJobData>): Promise<EmbeddingJob> {
    return await this.prisma.embeddingJob.update({
      where: { id },
      data: jobData as any,
    });
  }

  async deleteEmbeddingJob(id: number): Promise<EmbeddingJob> {
    return await this.prisma.embeddingJob.delete({
      where: { id },
    });
  }

  // Provider operations
  async createProvider(providerData: Partial<EmbeddingProvider>): Promise<EmbeddingProvider> {
    return await this.prisma.embeddingProvider.create({
      data: providerData as any,
    });
  }

  async getProviderById(id: number): Promise<EmbeddingProvider | null> {
    return await this.prisma.embeddingProvider.findUnique({
      where: { id },
    });
  }

  async updateProvider(id: number, providerData: Partial<EmbeddingProvider>): Promise<EmbeddingProvider> {
    return await this.prisma.embeddingProvider.update({
      where: { id },
      data: providerData as any,
    });
  }

  async deleteProvider(id: number): Promise<EmbeddingProvider> {
    return await this.prisma.embeddingProvider.delete({
      where: { id },
    });
  }

  // Model operations
  async createModel(modelData: Partial<EmbeddingModel>): Promise<EmbeddingModel> {
    return await this.prisma.embeddingModel.create({
      data: modelData as any,
    });
  }

  async getModelById(id: number): Promise<EmbeddingModel | null> {
    return await this.prisma.embeddingModel.findUnique({
      where: { id },
    });
  }

  async updateModel(id: number, modelData: Partial<EmbeddingModel>): Promise<EmbeddingModel> {
    return await this.prisma.embeddingModel.update({
      where: { id },
      data: modelData as any,
    });
  }

  async deleteModel(id: number): Promise<EmbeddingModel> {
    return await this.prisma.embeddingModel.delete({
      where: { id },
    });
  }

  // Vector index statistics operations
  async getVectorIndexStatistics(): Promise<VectorIndexStatistic | null> {
    return await this.prisma.vectorIndexStatistic.findFirst();
  }

  async updateVectorIndexStatistics(stats: Partial<VectorIndexStatistic>): Promise<VectorIndexStatistic> {
    const existing = await this.getVectorIndexStatistics();
    
    if (existing) {
      return await this.prisma.vectorIndexStatistic.update({
        where: { id: existing.id },
        data: stats as any,
      });
    } else {
      return await this.prisma.vectorIndexStatistic.create({
        data: stats as any,
      });
    }
  }
}
