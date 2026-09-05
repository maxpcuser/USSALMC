import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DiscoveryJob } from '@prisma/client';

@Injectable()
export class DiscoveryJobService {
  constructor(private prisma: PrismaService) {}

  async createDiscoveryJob(data: {
    sourceId: number;
    templateId: number;
    configuration: any;
  }): Promise<DiscoveryJob> {
    return this.prisma.discoveryJob.create({
      data: {
        sourceId: data.sourceId,
        templateId: data.templateId,
        status: 'Pending',
        configuration: data.configuration
      }
    });
  }

  async getDiscoveryJob(id: number): Promise<DiscoveryJob> {
    return this.prisma.discoveryJob.findUnique({
      where: { id },
      include: {
        source: true,
        template: true
      }
    });
  }

  async getDiscoveryJobs(): Promise<DiscoveryJob[]> {
    return this.prisma.discoveryJob.findMany({
      include: {
        source: true,
        template: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateDiscoveryJobStatus(id: number, status: string): Promise<DiscoveryJob> {
    const job = await this.prisma.discoveryJob.findUnique({ where: { id } });
    
    let data: any = { status };
    if (status === 'Processing') data.startedAt = new Date();
    if (status === 'Completed') data.completedAt = new Date();
    
    return this.prisma.discoveryJob.update({
      where: { id },
      data
    });
  }

  async deleteDiscoveryJob(id: number): Promise<DiscoveryJob> {
    return this.prisma.discoveryJob.delete({
      where: { id }
    });
  }
}