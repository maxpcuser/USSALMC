import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmbeddingService } from './embedding/embedding.service';
import { EmbeddingGenerationService } from './embedding/embedding-generation.service';
import { EmbeddingQueueService } from './embedding/embedding-queue.service';
import { EmbeddingProviderService } from './embedding-provider/embedding-provider.service';
import { VectorStorageService } from './vector-storage/vector-storage.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    EmbeddingService,
    EmbeddingGenerationService,
    EmbeddingQueueService,
    EmbeddingProviderService,
    VectorStorageService
  ],
  exports: [
    EmbeddingService,
    EmbeddingGenerationService,
    EmbeddingQueueService,
    EmbeddingProviderService,
    VectorStorageService
  ]
})
export class EmbeddingModule {}
