import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { 
  DiscoveryJob, 
  DiscoveryRule, 
  DiscoveryCandidate, 
  DiscoveryResult,
  DiscoveryStatistic 
} from '@prisma/client';

@Injectable()
export class DiscoveryRepository {
  constructor(private prisma: PrismaService) {}

  // Discovery Job Repository Methods
  async createDiscoveryJob(data: Omit<DiscoveryJob, 'id' | 'createdAt' | 'updatedAt'>): Promise<DiscoveryJob> {
    return this.prisma.discoveryJob.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  }

  async getDiscoveryJob(id: number): Promise<DiscoveryJob | null> {
    return this.prisma.discoveryJob.findUnique({ where: { id } });
  }

  async updateDiscoveryJob(id: number, data: Partial<DiscoveryJob>): Promise<DiscoveryJob> {
    return this.prisma.discoveryJob.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });
  }

  // Discovery Rule Repository Methods
  async createDiscoveryRule(data: Omit<DiscoveryRule, 'id' | 'createdAt' | 'updatedAt'>): Promise<DiscoveryRule> {
    return this.prisma.discoveryRule.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  }

  async getDiscoveryRules(templateId: number): Promise<DiscoveryRule[]> {
    return this.prisma.discoveryRule.findMany({
      where: { templateId, isActive: true },
      orderBy: { priority: 'asc' }
    });
  }

  async updateDiscoveryRule(id: number, data: Partial<DiscoveryRule>): Promise<DiscoveryRule> {
    return this.prisma.discoveryRule.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });
  }

  // Discovery Candidate Repository Methods
  async createDiscoveryCandidate(data: Omit<DiscoveryCandidate, 'id' | 'discoveredAt'>): Promise<DiscoveryCandidate> {
    return this.prisma.discoveryCandidate.create({
      data: {
        ...data,
        discoveredAt: new Date()
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

  async updateDiscoveryCandidateStatus(id: number, status: string): Promise<DiscoveryCandidate> {
    return this.prisma.discoveryCandidate.update({
      where: { id },
      data: { status }
    });
  }

  // Discovery Statistic Repository Methods
  async getDiscoveryStatistics(templateId: number): Promise<DiscoveryStatistic | null> {
    return this.prisma.discoveryStatistic.findUnique({ where: { templateId } });
  }

  async createDiscoveryStatistics(data: Omit<DiscoveryStatistic, 'id' | 'updatedAt'>): Promise<DiscoveryStatistic> {
    return this.prisma.discoveryStatistic.create({
      data: {
        ...data,
        updatedAt: new Date()
      }
    });
  }

  async updateDiscoveryStatistics(templateId: number, data: Partial<DiscoveryStatistic>): Promise<DiscoveryStatistic> {
    return this.prisma.discoveryStatistic.update({
      where: { templateId },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });
  }
}