import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentChunk, ChunkRelationship } from '@prisma/client';

@Injectable()
export class ChunkingService {
  constructor(private prisma: PrismaService) {}

  async createDocumentChunk(chunkData: Partial<DocumentChunk>): Promise<DocumentChunk> {
    return await this.prisma.documentChunk.create({
      data: chunkData,
    });
  }

  async getDocumentChunks(documentId: number): Promise<DocumentChunk[]> {
    return await this.prisma.documentChunk.findMany({
      where: { documentId },
      orderBy: { chunkIndex: 'asc' }
    });
  }

  async createChunkRelationship(relationshipData: Partial<ChunkRelationship>): Promise<ChunkRelationship> {
    return await this.prisma.chunkRelationship.create({
      data: relationshipData,
    });
  }

  async getChunkRelationships(sourceChunkId: number): Promise<ChunkRelationship[]> {
    return await this.prisma.chunkRelationship.findMany({
      where: { sourceChunkId },
    });
  }
}
