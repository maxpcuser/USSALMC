import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DiscoveryCandidate } from '@prisma/client';

@Injectable()
export class DiscoveryCandidateService {
  constructor(private prisma: PrismaService) {}

  async createDiscoveryCandidate(data: {
    sourceId: number;
    templateId: number;
    candidateUrl: string;
    normalizedUrl: string;
    pageTitle?: string;
    confidenceScore: number;
    candidateReason: string;
    metadata?: any;
  }): Promise<DiscoveryCandidate> {
    return this.prisma.discoveryCandidate.create({
      data: {
        sourceId: data.sourceId,
        templateId: data.templateId,
        candidateUrl: data.candidateUrl,
        normalizedUrl: data.normalizedUrl,
        pageTitle: data.pageTitle,
        confidenceScore: data.confidenceScore,
        candidateReason: data.candidateReason,
        status: 'Discovered',
        metadata: data.metadata || {}
      }
    });
  }

  async getDiscoveryCandidates(filter?: {
    templateId?: number;
    status?: string;
    sourceId?: number;
  }): Promise<DiscoveryCandidate[]> {
    const where: any = {};
    
    if (filter?.templateId) where.templateId = filter.templateId;
    if (filter?.status) where.status = filter.status;
    if (filter?.sourceId) where.sourceId = filter.sourceId;

    return this.prisma.discoveryCandidate.findMany({
      where,
      include: {
        source: true,
        template: true
      },
      orderBy: { discoveredAt: 'desc' }
    });
  }

  async getDiscoveryCandidate(id: number): Promise<DiscoveryCandidate> {
    return this.prisma.discoveryCandidate.findUnique({
      where: { id },
      include: {
        source: true,
        template: true
      }
    });
  }

  async updateDiscoveryCandidateStatus(id: number, status: string): Promise<DiscoveryCandidate> {
    return this.prisma.discoveryCandidate.update({
      where: { id },
      data: { status }
    });
  }

  async updateDiscoveryCandidate(id: number, data: any): Promise<DiscoveryCandidate> {
    return this.prisma.discoveryCandidate.update({
      where: { id },
      data
    });
  }

  async deleteDiscoveryCandidate(id: number): Promise<DiscoveryCandidate> {
    return this.prisma.discoveryCandidate.delete({
      where: { id }
    });
  }

  async approveDiscoveryCandidate(id: number): Promise<DiscoveryCandidate> {
    return this.prisma.discoveryCandidate.update({
      where: { id },
      data: { status: 'Approved' }
    });
  }

  async rejectDiscoveryCandidate(id: number): Promise<DiscoveryCandidate> {
    return this.prisma.discoveryCandidate.update({
      where: { id },
      data: { status: 'Rejected' }
    });
  }
}