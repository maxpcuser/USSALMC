import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DiscoveryRule } from '@prisma/client';

@Injectable()
export class DiscoveryRuleService {
  constructor(private prisma: PrismaService) {}

  async createDiscoveryRule(data: {
    templateId: number;
    ruleName: string;
    ruleType: string;
    ruleConfiguration: any;
    priority: number;
  }): Promise<DiscoveryRule> {
    return this.prisma.discoveryRule.create({
      data: {
        templateId: data.templateId,
        ruleName: data.ruleName,
        ruleType: data.ruleType,
        ruleConfiguration: data.ruleConfiguration,
        priority: data.priority
      }
    });
  }

  async getDiscoveryRules(templateId: number): Promise<DiscoveryRule[]> {
    return this.prisma.discoveryRule.findMany({
      where: { templateId },
      orderBy: { priority: 'asc' }
    });
  }

  async getDiscoveryRule(id: number): Promise<DiscoveryRule> {
    return this.prisma.discoveryRule.findUnique({ where: { id } });
  }

  async updateDiscoveryRule(id: number, data: any): Promise<DiscoveryRule> {
    return this.prisma.discoveryRule.update({
      where: { id },
      data
    });
  }

  async deleteDiscoveryRule(id: number): Promise<DiscoveryRule> {
    return this.prisma.discoveryRule.delete({
      where: { id }
    });
  }

  async enableDiscoveryRule(id: number): Promise<DiscoveryRule> {
    return this.prisma.discoveryRule.update({
      where: { id },
      data: { isActive: true }
    });
  }

  async disableDiscoveryRule(id: number): Promise<DiscoveryRule> {
    return this.prisma.discoveryRule.update({
      where: { id },
      data: { isActive: false }
    });
  }
}