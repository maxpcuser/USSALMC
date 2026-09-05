import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException } from '@nestjs/common';
import { ExtractionService } from './extraction.service';

@Controller('extraction')
export class ExtractionController {
  constructor(private extractionService: ExtractionService) {}

  // Extraction Workflow Endpoints
  @Get('workflows')
  async getExtractionWorkflows() {
    return this.extractionService.getExtractionWorkflows();
  }

  @Get('workflows/:id')
  async getExtractionWorkflow(@Param('id') id: number) {
    return this.extractionService.getExtractionWorkflow(id);
  }

  @Post('workflows')
  async createExtractionWorkflow(@Body() data: any) {
    if (!data.name || !data.sourceId || !data.templateId) {
      throw new BadRequestException('Name, sourceId, and templateId are required');
    }
    return this.extractionService.createExtractionWorkflow(data);
  }

  @Put('workflows/:id')
  async updateExtractionWorkflow(@Param('id') id: number, @Body() data: any) {
    return this.extractionService.updateExtractionWorkflow(id, data);
  }

  @Delete('workflows/:id')
  async deleteExtractionWorkflow(@Param('id') id: number) {
    return this.extractionService.deleteExtractionWorkflow(id);
  }

  // Extraction Job Endpoints
  @Get('jobs')
  async getExtractionJobs() {
    return this.extractionService.getExtractionJobs();
  }

  @Get('jobs/:id')
  async getExtractionJob(@Param('id') id: number) {
    return this.extractionService.getExtractionJob(id);
  }

  @Post('jobs')
  async createExtractionJob(@Body() data: any) {
    if (!data.workflowId || !data.sourceId) {
      throw new BadRequestException('workflowId and sourceId are required');
    }
    return this.extractionService.createExtractionJob(data);
  }

  @Put('jobs/:id')
  async updateExtractionJob(@Param('id') id: number, @Body() data: any) {
    return this.extractionService.updateExtractionJob(id, data);
  }

  @Delete('jobs/:id')
  async deleteExtractionJob(@Param('id') id: number) {
    return this.extractionService.deleteExtractionJob(id);
  }

  // Workflow Execution Endpoints
  @Post('workflows/:id/execute')
  async executeWorkflow(@Param('id') id: number) {
    return this.extractionService.executeWorkflow(id);
  }

  @Post('jobs/:id/start')
  async startExtractionJob(@Param('id') id: number) {
    return this.extractionService.startExtractionJob(id);
  }

  @Post('jobs/:id/stop')
  async stopExtractionJob(@Param('id') id: number) {
    return this.extractionService.stopExtractionJob(id);
  }

  // Extraction Status Endpoints
  @Get('status/:jobId')
  async getExtractionStatus(@Param('jobId') jobId: number) {
    return this.extractionService.getExtractionStatus(jobId);
  }

  @Get('jobs/:id/results')
  async getExtractionResults(@Param('id') id: number) {
    return this.extractionService.getExtractionResults(id);
  }
}