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
export class DiscoveryService {
  constructor(private prisma: PrismaService) {}

  // Discovery Job Methods
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
      }
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

  // Discovery Rule Methods  
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

  // Discovery Candidate Methods
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

  async updateDiscoveryCandidateStatus(id: number, status: string): Promise<DiscoveryCandidate> {
    return this.prisma.discoveryCandidate.update({
      where: { id },
      data: { status }
    });
  }

  // Discovery Result Methods
  async createDiscoveryResult(data: {
    discoveryJobId: number;
    candidateId: number;
    decision: string;
    reason?: string;
  }): Promise<DiscoveryResult> {
    return this.prisma.discoveryResult.create({
      data: {
        discoveryJobId: data.discoveryJobId,
        candidateId: data.candidateId,
        decision: data.decision,
        reason: data.reason
      }
    });
  }

  // Discovery Statistic Methods
  async getDiscoveryStatistics(templateId: number): Promise<DiscoveryStatistic> {
    return this.prisma.discoveryStatistic.findUnique({
      where: { templateId }
    }) || this.prisma.discoveryStatistic.create({
      data: {
        templateId,
        pagesScanned: 0,
        linksDiscovered: 0,
        candidatesGenerated: 0,
        candidatesApproved: 0,
        candidatesRejected: 0,
        averageConfidence: 0.0
      }
    });
  }

  async updateDiscoveryStatistics(templateId: number, updates: any): Promise<DiscoveryStatistic> {
    return this.prisma.discoveryStatistic.update({
      where: { templateId },
      data: updates
    });
  }

  // Method to validate URLs against discovery rules
  async validateUrlPattern(candidateUrl: string, rules: DiscoveryRule[]): Promise<{isValid: boolean, confidence: number, reason: string}> {
    let maxConfidence = 0;
    let bestReason = 'No matching rule found';
    
    for (const rule of rules) {
      if (!rule.isActive) continue;

      const config = rule.ruleConfiguration;
      let confidence = 0;
      let reason = '';

      // Different rule types
      switch (rule.ruleType) {
        case 'URL Pattern':
          if (config.pattern && candidateUrl.match(new RegExp(config.pattern))) {
            confidence = 0.9; // High confidence for direct pattern match
            reason = `URL matches pattern: ${config.pattern}`;
          } else {
            confidence = 0.1; // Low confidence for non-match
            reason = 'URL does not match pattern';
          }
          break;
          
        case 'Category Page':
          if (config.category && candidateUrl.includes(config.category)) {
            // Category matches give moderate confidence
            confidence = 0.7;
            reason = `URL contains category: ${config.category}`;
          } else {
            confidence = 0.3;
            reason = 'URL does not contain target category';
          }
          break;
          
        case 'Link Analysis':
          // Simple analysis based on link structure
          if (candidateUrl.includes('ship') || candidateUrl.includes('ships')) {
            confidence = 0.8; 
            reason = 'URL contains ship-related keywords';
          } else if (config.minLength && candidateUrl.length > config.minLength) {
            confidence = 0.6;
            reason = `URL length (${candidateUrl.length}) qualifies as a content page`;
          } else {
            confidence = 0.2;
            reason = 'URL does not meet link analysis criteria';
          }
          break;
          
        default:
          confidence = 0.5; // Default confidence
          reason = `Rule type ${rule.ruleType} applied`;
      }

      if (confidence > maxConfidence) {
        maxConfidence = confidence;
        bestReason = reason;
      }
    }

    return {
      isValid: maxConfidence > 0.6, // Threshold for acceptance
      confidence: maxConfidence,
      reason: bestReason
    };
  }

  // Method to generate candidates from domain or URL list
  async generateCandidatesFromUrlList(
    sourceId: number, 
    templateId: number, 
    urlList: string[],
    rules: DiscoveryRule[]
  ): Promise<DiscoveryCandidate[]> {
    const candidates: DiscoveryCandidate[] = [];
    
    for (const originalUrl of urlList) {
      // Apply validation logic
      const validation = await this.validateUrlPattern(originalUrl, rules);
      
      if (validation.isValid) {
        const candidate = await this.createDiscoveryCandidate({
          sourceId,
          templateId,
          candidateUrl: originalUrl,
          normalizedUrl: this.normalizeUrl(originalUrl),
          confidenceScore: validation.confidence,
          candidateReason: validation.reason
        });
        
        candidates.push(candidate);
      }
    }
    
    return candidates;
  }

  private normalizeUrl(url: string): string {
    try {
      const parsedUrl = new URL(url);
      return `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`;
    } catch (error) {
      return url;
    }
  }
}