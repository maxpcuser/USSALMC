import { Injectable, Logger } from '@nestjs/common';
import { DiscoveryJobService } from './discovery-job.service';
import { DiscoveryCandidateService } from './discovery-candidate.service';
import { DiscoveryRepository } from './repository/discovery.repository';
import { PlaywrightService } from '../playwright/playwright.service';

@Injectable()
export class DiscoveryWorker {
  private readonly logger = new Logger(DiscoveryWorker.name);

  constructor(
    private discoveryJobService: DiscoveryJobService,
    private discoveryCandidateService: DiscoveryCandidateService,
    private discoveryRepository: DiscoveryRepository,
    private playwrightService: PlaywrightService
  ) {}

  async processDiscoveryJob(jobId: number): Promise<void> {
    this.logger.log(`Starting to process discovery job ${jobId}`);
    
    try {
      // Update job status to Processing
      await this.discoveryJobService.updateDiscoveryJobStatus(jobId, 'Processing');
      
      // Get the job details
      const job = await this.discoveryJobService.getDiscoveryJob(jobId);
      if (!job) {
        throw new Error(`Discovery job ${jobId} not found`);
      }

      // Run URL discovery logic based on job configuration
      await this.discoverUrls(job);

      // Update job status to Completed
      await this.discoveryJobService.updateDiscoveryJobStatus(jobId, 'Completed');
      
      this.logger.log(`Successfully processed discovery job ${jobId}`);
    } catch (error) {
      this.logger.error(`Error processing discovery job ${jobId}:`, error);
      
      // Update job status to Failed
      await this.discoveryJobService.updateDiscoveryJobStatus(jobId, 'Failed');
      
      // Store error message if needed
      await this.discoveryRepository.updateDiscoveryJob(jobId, {
        errorMessage: error.message
      });
    }
  }

  private async discoverUrls(job: any): Promise<void> {
    const sourceId = job.sourceId;
    const templateId = job.templateId;
    
    // Get discovery rules for this template
    const rules = await this.discoveryRepository.getDiscoveryRules(templateId);
    
    // For now we'll simulate URL discovery logic
    // In a full implementation, this would:
    // 1. Analyze the source domain to find links 
    // 2. Use rules to determine which links are candidates
    // 3. Generate candidate URLs and their confidence scores
    
    // Mock data - in reality this would use Playwright to scan pages
    const mockCandidates = [
      {
        url: 'https://wiki.example.com/ships/prospector',
        pageTitle: 'Prospector Ship',
        confidenceScore: 0.95,
        reason: 'URL pattern match'
      },
      {
        url: 'https://wiki.example.com/ships/mole',
        pageTitle: 'Mole Ship',
        confidenceScore: 0.87,
        reason: 'URL pattern match'
      },
      {
        url: 'https://wiki.example.com/ships/orion',
        pageTitle: 'Orion Ship',
        confidenceScore: 0.92,
        reason: 'URL pattern match'
      }
    ];

    for (const candidateData of mockCandidates) {
      await this.discoveryCandidateService.createDiscoveryCandidate({
        sourceId,
        templateId,
        candidateUrl: candidateData.url,
        normalizedUrl: this.normalizeUrl(candidateData.url),
        pageTitle: candidateData.pageTitle,
        confidenceScore: candidateData.confidenceScore,
        candidateReason: candidateData.reason
      });
    }
    
    // Update statistics
    const stats = await this.discoveryRepository.getDiscoveryStatistics(templateId);
    if (stats) {
      await this.discoveryRepository.updateDiscoveryStatistics(templateId, {
        pagesScanned: stats.pagesScanned + 1,
        candidatesGenerated: stats.candidatesGenerated + mockCandidates.length
      });
    }
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