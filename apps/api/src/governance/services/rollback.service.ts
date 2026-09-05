import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RollbackOperation, KnowledgeHistory } from '@prisma/client';

@Injectable()
export class RollbackService {
  constructor(private prisma: PrismaService) {}

  async createRollbackOperation(
    resourceType: string,
    resourceId: number,
    targetVersion: number,
    rollbackReason: string,
    executedBy: string
  ): Promise<RollbackOperation> {
    return this.prisma.rollbackOperation.create({
      data: {
        resourceType,
        resourceId,
        targetVersion,
        rollbackReason,
        executedBy,
        executedAt: new Date()
      }
    });
  }

  async getRollbackOperations(
    resourceType?: string,
    resourceId?: number
  ): Promise<RollbackOperation[]> {
    const where: any = {};
    
    if (resourceType) {
      where.resourceType = { equals: resourceType };
    }
    
    if (resourceId) {
      where.resourceId = { equals: resourceId };
    }
    
    return this.prisma.rollbackOperation.findMany({
      where,
      orderBy: {
        executedAt: 'desc'
      }
    });
  }

  async getRollbackOperationById(id: number): Promise<RollbackOperation | null> {
    return this.prisma.rollbackOperation.findUnique({
      where: { id }
    });
  }

  async executeRollback(
    operationId: number,
    targetVersion?: number
  ): Promise<any> {
    const rollbackOp = await this.prisma.rollbackOperation.findUnique({
      where: { id: operationId },
      include: { 
        knowledgeHistory: true 
      }
    });

    if (!rollbackOp) {
      throw new Error('Rollback operation not found');
    }

    // If no target version is specified, use the one from the rollback op
    const version = targetVersion || rollbackOp.targetVersion;
    
    // Get the historical snapshot to rollback to
    const historyRecord = await this.prisma.knowledgeHistory.findFirst({
      where: {
        resourceType: rollbackOp.resourceType,
        resourceId: rollbackOp.resourceId,
        versionNumber: version
      }
    });

    if (!historyRecord) {
      throw new Error(`No historical data found for version ${version}`);
    }

    // For demonstration purposes, we'll just return the data that would be rolled back
    const snapshotData = JSON.parse(historyRecord.snapshot);
    
    // In a real system, you would actually restore the resource to this state
    // This would involve calling the respective entity's update service
    
    return {
      operationId,
      resourceType: rollbackOp.resourceType,
      resourceId: rollbackOp.resourceId,
      targetVersion: version,
      restoredData: snapshotData,
      timestamp: new Date()
    };
  }

  async validateRollback(
    resourceType: string,
    resourceId: number,
    targetVersion: number
  ): Promise<{ valid: boolean; message?: string }> {
    // Check if the resource exists in our system
    const hasHistory = await this.prisma.knowledgeHistory.findFirst({
      where: {
        resourceType,
        resourceId
      }
    });

    if (!hasHistory) {
      return { valid: false, message: 'Resource does not exist or never had history' };
    }

    // Check if the specific version exists
    const recordExists = await this.prisma.knowledgeHistory.findFirst({
      where: {
        resourceType,
        resourceId,
        versionNumber: targetVersion
      }
    });

    if (!recordExists) {
      return { valid: false, message: `Version ${targetVersion} does not exist` };
    }

    return { valid: true };
  }
}