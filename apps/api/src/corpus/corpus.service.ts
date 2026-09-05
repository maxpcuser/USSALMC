import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Document, DocumentChunk, DocumentTag, DocumentClassification } from '@prisma/client';

@Injectable()
export class CorpusService {
  constructor(private prisma: PrismaService) {}

  async getCorpusOverview(): Promise<any> {
    const [docCount, chunkCount, tagCount, classificationCount] = await Promise.all([
      this.prisma.document.count(),
      this.prisma.documentChunk.count(),
      this.prisma.documentTag.count(),
      this.prisma.documentClassification.count()
    ]);

    return {
      documentCount: docCount,
      chunkCount: chunkCount,
      tagCount: tagCount,
      classificationCount: classificationCount
    };
  }

  async getDocumentRelationships(documentId: number): Promise<any> {
    // Get all chunks for this document and their relationships
    const chunks = await this.prisma.documentChunk.findMany({
      where: { documentId },
      include: {
        sourceChunk: true,
        targetChunk: true
      }
    });

    return chunks;
  }

  async getEntityAssociations(): Promise<any> {
    // Get documents associated with entities
    const docs = await this.prisma.document.findMany({
      where: { entityId: { not: null } },
      select: {
        id: true,
        title: true,
        entityId: true,
        entity: {
          select: {
            name: true
          }
        }
      }
    });

    return docs;
  }
}
