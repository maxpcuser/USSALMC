import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Document, DocumentVersion, DocumentChunk, ChunkRelationship, DocumentTag, DocumentClassification } from '@prisma/client';

@Injectable()
export class DocumentProcessingService {
  constructor(private prisma: PrismaService) {}

  async createDocument(documentData: Partial<Document>): Promise<Document> {
    return await this.prisma.document.create({
      data: documentData,
    });
  }

  async getDocumentById(id: number): Promise<Document | null> {
    return await this.prisma.document.findUnique({
      where: { id },
    });
  }

  async updateDocument(id: number, documentData: Partial<Document>): Promise<Document> {
    return await this.prisma.document.update({
      where: { id },
      data: documentData,
    });
  }

  async deleteDocument(id: number): Promise<Document> {
    return await this.prisma.document.delete({
      where: { id },
    });
  }

  // Version-related methods
  async createDocumentVersion(versionData: Partial<DocumentVersion>): Promise<DocumentVersion> {
    return await this.prisma.documentVersion.create({
      data: versionData,
    });
  }

  async getDocumentVersions(documentId: number): Promise<DocumentVersion[]> {
    return await this.prisma.documentVersion.findMany({
      where: { documentId },
      orderBy: { versionNumber: 'asc' }
    });
  }

  // Chunk-related methods
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

  // Classification methods
  async createDocumentClassification(classificationData: Partial<DocumentClassification>): Promise<DocumentClassification> {
    return await this.prisma.documentClassification.create({
      data: classificationData,
    });
  }

  async getDocumentClassifications(documentId: number): Promise<DocumentClassification[]> {
    return await this.prisma.documentClassification.findMany({
      where: { documentId }
    });
  }

  // Tag methods
  async createDocumentTag(tagData: Partial<DocumentTag>): Promise<DocumentTag> {
    return await this.prisma.documentTag.create({
      data: tagData,
    });
  }

  async getDocumentTags(documentId: number): Promise<DocumentTag[]> {
    return await this.prisma.documentTag.findMany({
      where: { documentId }
    });
  }
}
