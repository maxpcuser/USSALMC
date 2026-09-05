import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GovernancePolicy } from '@prisma/client';

export type PolicyType = 
  | 'RequireApproval'
  | 'AutomaticApproval'
  | 'ProtectResource'
  | 'PreventDelete'
  | 'EnforceVersionRetention'
  | 'RequireReason';

@Injectable()
export class GovernanceService {
  constructor(private prisma: PrismaService) {}

  async createGovernancePolicy(
    name: string,
    policyType: PolicyType,
    resourceType: string,
    configuration?: any
  ): Promise<GovernancePolicy> {
    return this.prisma.governancePolicy.create({
      data: {
        name,
        policyType,
        resourceType,
        configuration: configuration ? JSON.stringify(configuration) as any : null
      }
    });
  }

  async getGovernancePolicies(
    resourceType?: string
  ): Promise<GovernancePolicy[]> {
    const where: any = {};
    
    if (resourceType) {
      where.resourceType = { equals: resourceType };
    }
    
    return this.prisma.governancePolicy.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getGovernancePolicyById(id: number): Promise<GovernancePolicy | null> {
    return this.prisma.governancePolicy.findUnique({
      where: { id }
    });
  }

  async updateGovernancePolicy(
    id: number,
    updates: Partial<GovernancePolicy>
  ): Promise<GovernancePolicy> {
    const policy = await this.prisma.governancePolicy.update({
      where: { id },
      data: {
        ...updates,
        updatedAt: new Date()
      }
    });

    return policy;
  }

  async deleteGovernancePolicy(id: number): Promise<boolean> {
    try {
      await this.prisma.governancePolicy.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async enforcePolicy(
    resourceType: string,
    action: string,
    details?: any
  ): Promise<{ allowed: boolean; policy?: GovernancePolicy; reason?: string }> {
    const policies = await this.prisma.governancePolicy.findMany({
      where: {
        resourceType: { equals: resourceType },
        isEnabled: true
      }
    });

    // Simple policy enforcement logic
    for (const policy of policies) {
      const config = policy.configuration ? JSON.parse(policy.configuration) : {};
      
      switch (policy.policyType) {
        case 'RequireApproval':
          return {
            allowed: false, 
            policy,
            reason: 'This resource requires approval before changes can be made'
          };
          
        case 'PreventDelete':
          if (action === 'Delete') {
            return {
              allowed: false,
              policy,
              reason: 'Deletion of this resource type is not permitted by policy'
            };
          }
          break;
          
        case 'ProtectResource':
          // This could be more complex in a real implementation
          return {
            allowed: true,
            policy
          };
          
        default:
          // Default to allowing action if no policy applies
          return { allowed: true };
      }
    }

    // If we get here with no specific blocking policies, allow the action
    return { allowed: true };
  }

  async isActionAllowed(
    resourceType: string,
    action: string,
    details?: any
  ): Promise<boolean> {
    const result = await this.enforcePolicy(resourceType, action, details);
    return result.allowed;
  }
}