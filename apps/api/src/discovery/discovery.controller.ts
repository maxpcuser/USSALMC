import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';
import { DiscoveryJobService } from './discovery-job.service';
import { DiscoveryRuleService } from './discovery-rule.service';
import { DiscoveryCandidateService } from './discovery-candidate.service';

@Controller('discovery')
export class DiscoveryController {
  constructor(
    private discoveryService: DiscoveryService,
    private discoveryJobService: DiscoveryJobService,
    private discoveryRuleService: DiscoveryRuleService,
    private discoveryCandidateService: DiscoveryCandidateService
  ) {}

  // Discovery Job Endpoints
  @Get('jobs')
  async getDiscoveryJobs() {
    return this.discoveryJobService.getDiscoveryJobs();
  }

  @Get('jobs/:id')
  async getDiscoveryJob(@Param('id') id: number) {
    return this.discoveryJobService.getDiscoveryJob(id);
  }

  @Post('jobs')
  async createDiscoveryJob(@Body() data: any) {
    return this.discoveryJobService.createDiscoveryJob(data);
  }

  @Delete('jobs/:id')
  async deleteDiscoveryJob(@Param('id') id: number) {
    return this.discoveryJobService.deleteDiscoveryJob(id);
  }

  // Discovery Rule Endpoints
  @Get('rules')
  async getDiscoveryRules() {
    // This would typically be filtered by templateId
    return [];
  }

  @Post('rules')
  async createDiscoveryRule(@Body() data: any) {
    return this.discoveryRuleService.createDiscoveryRule(data);
  }

  @Put('rules/:id')
  async updateDiscoveryRule(@Param('id') id: number, @Body() data: any) {
    return this.discoveryRuleService.updateDiscoveryRule(id, data);
  }

  @Delete('rules/:id')
  async deleteDiscoveryRule(@Param('id') id: number) {
    return this.discoveryRuleService.deleteDiscoveryRule(id);
  }

  // Discovery Candidate Endpoints
  @Get('candidates')
  async getDiscoveryCandidates() {
    return this.discoveryCandidateService.getDiscoveryCandidates();
  }

  @Get('candidates/:id')
  async getDiscoveryCandidate(@Param('id') id: number) {
    return this.discoveryCandidateService.getDiscoveryCandidate(id);
  }

  @Post('candidates/:id/approve')
  async approveDiscoveryCandidate(@Param('id') id: number) {
    return this.discoveryCandidateService.approveDiscoveryCandidate(id);
  }

  @Post('candidates/:id/reject')
  async rejectDiscoveryCandidate(@Param('id') id: number) {
    return this.discoveryCandidateService.rejectDiscoveryCandidate(id);
  }

  // Analysis and Scan Endpoints
  @Post('analyze')
  async analyzeUrl(@Body() data: any) {
    // Placeholder for URL analysis functionality
    return { message: 'Analysis complete' };
  }

  @Post('scan')
  async scanDomain(@Body() data: any) {
    // Placeholder for domain scanning functionality
    return { message: 'Scan complete' };
  }
}