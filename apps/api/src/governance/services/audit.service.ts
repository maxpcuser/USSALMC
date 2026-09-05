import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditEvent } from '@prisma/client';

export type AuditEventType = 
  | 'Create'
  | 'Update'
  | 'Delete'
  | 'Restore'
  | 'Import'
  | 'Export'
  | 'Approval'
  | 'Rejection'
  | 'Template Change'
  | 'Discovery Approval'
  | 'Extraction Execution'
  | 'Document Processing'
  | 'Embedding Generation'
  | 'Search Execution'
  | 'Context Generation'
  | 'Automation Execution'
  | 'API Access'
  | 'Authentication';

export type AuditEventDetails = {
  resourceType?: string;
  resourceId?: number;
  action: string;
  beforeState?: any;
  afterState?: any;
  userSource?: string;
  requestSource?: string;
  apiClient?: string;
  executionContext?: any;
};

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async createAuditEvent(
    eventType: AuditEventType,
    details: AuditEventDetails
  ): Promise<AuditEvent> {
    return this.prisma.auditEvent.create({
      data: {
        eventType,
        entityId: details.resourceId ?? null,
        entityType: details.resourceType ?? null,
        details: JSON.stringify(details) as any
      }
    });
  }

  async getAuditEvents(
    skip?: number,
    take?: number,
    eventType?: AuditEventType
  ): Promise<AuditEvent[]> {
    return this.prisma.auditEvent.findMany({
      skip,
      take,
      where: {
        eventType: eventType ? { equals: eventType } : undefined
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getAuditEventById(id: number): Promise<AuditEvent | null> {
    return this.prisma.auditEvent.findUnique({
      where: { id }
    });
  }

  async getAuditEventsForResource(
    resourceType: string,
    resourceId: number
  ): Promise<AuditEvent[]> {
    return this.prisma.auditEvent.findMany({
      where: {
        entityType: resourceType,
        entityId: resourceId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
}