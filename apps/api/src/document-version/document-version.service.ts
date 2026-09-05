import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentVersion } from '@prisma/client';

@Injectable()
export class DocumentVersionService {
  constructor(private prisma: PrismaService) {}

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

  async getDocumentVersionById(id: number): Promise<DocumentVersion | null> {
    return await this.prisma.documentVersion.findUnique({
      where: { id },
    });
  }

  async updateDocumentVersion(id: number, versionData: Partial<DocumentVersion>): Promise<DocumentVersion> {
    return await this.prisma.documentVersion.update({
      where: { id },
      data: versionData,
    });
  }
}
