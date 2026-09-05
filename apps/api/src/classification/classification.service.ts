import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentClassification } from '@prisma/client';

@Injectable()
export class ClassificationService {
  constructor(private prisma: PrismaService) {}

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

  async updateDocumentClassification(id: number, classificationData: Partial<DocumentClassification>): Promise<DocumentClassification> {
    return await this.prisma.documentClassification.update({
      where: { id },
      data: classificationData,
    });
  }
}
