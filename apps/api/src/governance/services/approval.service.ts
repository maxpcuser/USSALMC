import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { 
  ApprovalRequest, 
  ApprovalDecision, 
  ChangeSet,
  GovernancePolicy
} from '@prisma/client';

export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected' | 'Expired';

@Injectable()
export class ApprovalService {
  constructor(private prisma: PrismaService) {}

  async createApprovalRequest(
    resourceType: string,
    resourceId: number,
    changeSetId: number,
    requestReason: string,
    requestedBy: string,
    expiresInHours?: number
  ): Promise<ApprovalRequest> {
    const expiresAt = expiresInHours 
      ? new Date(Date.now() + (expiresInHours * 60 * 60 * 1000))
      : undefined;

    return this.prisma.approvalRequest.create({
      data: {
        resourceType,
        resourceId,
        changeSetId,
        requestReason,
        requestedBy,
        expiresAt
      }
    });
  }

  async getApprovalRequests(
    skip?: number,
    take?: number,
    status?: ApprovalStatus
  ): Promise<ApprovalRequest[]> {
    return this.prisma.approvalRequest.findMany({
      skip,
      take,
      where: {
        status: status ? { equals: status } : undefined
      },
      orderBy: {
        requestedAt: 'desc'
      },
      include: {
        changeSet: true
      }
    });
  }

  async getApprovalRequestById(id: number): Promise<ApprovalRequest | null> {
    return this.prisma.approvalRequest.findUnique({
      where: { id },
      include: {
        changeSet: true
      }
    });
  }

  async approveRequest(
    requestId: number,
    decisionReason: string,
    approvedBy: string
  ): Promise<ApprovalDecision> {
    const approvalRequest = await this.prisma.approvalRequest.findUnique({
      where: { id: requestId },
      include: { changeSet: true }
    });

    if (!approvalRequest) {
      throw new Error('Approval request not found');
    }

    // Update the approval request status
    await this.prisma.approvalRequest.update({
      where: { id: requestId },
      data: { status: 'Approved' }
    });

    // Create decision record
    const decision = await this.prisma.approvalDecision.create({
      data: {
        approvalRequestId: requestId,
        decision: 'Approved',
        decisionReason,
        approvedBy,
        decidedAt: new Date()
      }
    });

    return decision;
  }

  async rejectRequest(
    requestId: number,
    decisionReason: string,
    rejectedBy: string
  ): Promise<ApprovalDecision> {
    const approvalRequest = await this.prisma.approvalRequest.findUnique({
      where: { id: requestId },
      include: { changeSet: true }
    });

    if (!approvalRequest) {
      throw new Error('Approval request not found');
    }

    // Update the approval request status
    await this.prisma.approvalRequest.update({
      where: { id: requestId },
      data: { status: 'Rejected' }
    });

    // Create decision record
    const decision = await this.prisma.approvalDecision.create({
      data: {
        approvalRequestId: requestId,
        decision: 'Rejected',
        decisionReason,
        approvedBy: rejectedBy,
        decidedAt: new Date()
      }
    });

    return decision;
  }

  async validateRequest(
    resourceType: string,
    resourceId: number,
    changeSetId: number
  ): Promise<boolean> {
    // Check if any policy applies to this resource type and action
    const policies = await this.prisma.governancePolicy.findMany({
      where: {
        resourceType: { equals: resourceType },
        isEnabled: true
      }
    });

    // For now, let's assume all changes require approval for demonstration purposes
    return policies.length > 0;
  }
}