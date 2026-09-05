import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { KnowledgeHistory, ChangeSet } from '@prisma/client';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async createKnowledgeSnapshot(
    resourceType: string,
    resourceId: number,
    snapshotData: any,
    changeReference?: string
  ): Promise<KnowledgeHistory> {
    // Get the latest version number for this resource
    const lastVersion = await this.prisma.knowledgeHistory.findFirst({
      where: {
        resourceType,
        resourceId
      },
      orderBy: {
        versionNumber: 'desc'
      }
    });

    const versionNumber = lastVersion ? lastVersion.versionNumber + 1 : 1;

    return this.prisma.knowledgeHistory.create({
      data: {
        resourceType,
        resourceId,
        versionNumber,
        snapshot: JSON.stringify(snapshotData) as any,
        changeReference
      }
    });
  }

  async getKnowledgeHistory(
    resourceType: string,
    resourceId: number
  ): Promise<KnowledgeHistory[]> {
    return this.prisma.knowledgeHistory.findMany({
      where: {
        resourceType,
        resourceId
      },
      orderBy: {
        versionNumber: 'asc'
      }
    });
  }

  async getKnowledgeSnapshot(
    resourceType: string,
    resourceId: number,
    versionNumber: number
  ): Promise<KnowledgeHistory | null> {
    return this.prisma.knowledgeHistory.findUnique({
      where: {
        resourceType_resourceId_versionNumber: {
          resourceType,
          resourceId,
          versionNumber
        }
      }
    });
  }

  async getLatestKnowledgeSnapshot(
    resourceType: string,
    resourceId: number
  ): Promise<KnowledgeHistory | null> {
    return this.prisma.knowledgeHistory.findFirst({
      where: {
        resourceType,
        resourceId
      },
      orderBy: {
        versionNumber: 'desc'
      }
    });
  }

  async compareVersions(
    resourceType: string,
    resourceId: number,
    versionA: number,
    versionB: number
  ): Promise<any> {
    const snapshotA = await this.getKnowledgeSnapshot(resourceType, resourceId, versionA);
    const snapshotB = await this.getKnowledgeSnapshot(resourceType, resourceId, versionB);

    if (!snapshotA || !snapshotB) {
      throw new Error('One or both versions not found');
    }

    return {
      versionA: {
        number: versionA,
        data: JSON.parse(snapshotA.snapshot),
        date: snapshotA.createdAt
      },
      versionB: {
        number: versionB,
        data: JSON.parse(snapshotB.snapshot),
        date: snapshotB.createdAt
      },
      differences: this.computeDifferences(
        JSON.parse(snapshotA.snapshot),
        JSON.parse(snapshotB.snapshot)
      )
    };
  }

  private computeDifferences(obj1: any, obj2: any): any {
    // Simple recursive diff computation for demonstration
    const differences = {};
    
    const getAllKeys = (obj) => Object.keys(obj).reduce((acc, key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        return [...acc, ...getAllKeys(obj[key]).map(k => `${key}.${k}`)];
      }
      return [...acc, key];
    }, []);

    const allKeys = new Set([...getAllKeys(obj1), ...getAllKeys(obj2)]);
    
    for (const key of allKeys) {
      const val1 = this.getNestedValue(obj1, key);
      const val2 = this.getNestedValue(obj2, key);
      
      if (val1 !== val2) {
        differences[key] = {
          before: val1,
          after: val2
        };
      }
    }
    
    return differences;
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  async reconstructResource(
    resourceType: string,
    resourceId: number
  ): Promise<any> {
    const history = await this.getKnowledgeHistory(resourceType, resourceId);
    
    if (history.length === 0) {
      return null;
    }
    
    // Reconstruct the current state by applying changes from version 1 onwards
    let currentState = {};
    
    for (const record of history) {
      const snapshotData = JSON.parse(record.snapshot);
      
      // Simple merge for demonstration purposes
      Object.assign(currentState, snapshotData);
    }
    
    return currentState;
  }

  async getChangeSets(
    resourceType?: string,
    resourceId?: number
  ): Promise<ChangeSet[]> {
    const where: any = {};
    
    if (resourceType) {
      where.resourceType = { equals: resourceType };
    }
    
    if (resourceId) {
      where.resourceId = { equals: resourceId };
    }
    
    return this.prisma.changeSet.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getChangeSetById(id: number): Promise<ChangeSet | null> {
    return this.prisma.changeSet.findUnique({
      where: { id }
    });
  }

  async createChangeSet(
    resourceType: string,
    resourceId: number,
    changeType: string,
    beforeState?: any,
    afterState?: any,
    changeSummary?: string,
    initiatedBy: string = 'system'
  ): Promise<ChangeSet> {
    return this.prisma.changeSet.create({
      data: {
        resourceType,
        resourceId,
        changeType,
        beforeState: beforeState ? JSON.stringify(beforeState) as any : null,
        afterState: afterState ? JSON.stringify(afterState) as any : null,
        changeSummary,
        initiatedBy
      }
    });
  }
}