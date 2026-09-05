import { Injectable } from '@nestjs/common';

@Injectable()
export class ExtractionService {
  // In-memory storage for demonstration - in production, this would use a database
  private workflows = [];
  private jobs = [];
  private nextWorkflowId = 1;
  private nextJobId = 1;

  async getExtractionWorkflows() {
    return this.workflows;
  }

  async getExtractionWorkflow(id: number) {
    const workflow = this.workflows.find(w => w.id === id);
    if (!workflow) {
      throw new Error('Extraction workflow not found');
    }
    return workflow;
  }

  async createExtractionWorkflow(data: any) {
    const workflow = {
      id: this.nextWorkflowId++,
      name: data.name,
      sourceId: data.sourceId,
      templateId: data.templateId,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'created'
    };
    
    this.workflows.push(workflow);
    return workflow;
  }

  async updateExtractionWorkflow(id: number, data: any) {
    const index = this.workflows.findIndex(w => w.id === id);
    if (index === -1) {
      throw new Error('Extraction workflow not found');
    }
    
    this.workflows[index] = {
      ...this.workflows[index],
      ...data,
      updatedAt: new Date()
    };
    
    return this.workflows[index];
  }

  async deleteExtractionWorkflow(id: number) {
    const index = this.workflows.findIndex(w => w.id === id);
    if (index === -1) {
      throw new Error('Extraction workflow not found');
    }
    
    this.workflows.splice(index, 1);
    return { message: 'Workflow deleted successfully' };
  }

  async getExtractionJobs() {
    return this.jobs;
  }

  async getExtractionJob(id: number) {
    const job = this.jobs.find(j => j.id === id);
    if (!job) {
      throw new Error('Extraction job not found');
    }
    return job;
  }

  async createExtractionJob(data: any) {
    const job = {
      id: this.nextJobId++,
      workflowId: data.workflowId,
      sourceId: data.sourceId,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.jobs.push(job);
    return job;
  }

  async updateExtractionJob(id: number, data: any) {
    const index = this.jobs.findIndex(j => j.id === id);
    if (index === -1) {
      throw new Error('Extraction job not found');
    }
    
    this.jobs[index] = {
      ...this.jobs[index],
      ...data,
      updatedAt: new Date()
    };
    
    return this.jobs[index];
  }

  async deleteExtractionJob(id: number) {
    const index = this.jobs.findIndex(j => j.id === id);
    if (index === -1) {
      throw new Error('Extraction job not found');
    }
    
    this.jobs.splice(index, 1);
    return { message: 'Job deleted successfully' };
  }

  async executeWorkflow(workflowId: number) {
    const workflow = await this.getExtractionWorkflow(workflowId);
    
    // Create a job for the workflow execution
    const job = await this.createExtractionJob({
      workflowId: workflow.id,
      sourceId: workflow.sourceId
    });
    
    // Update workflow status
    await this.updateExtractionWorkflow(workflowId, { 
      status: 'executing',
      lastExecutedAt: new Date()
    });
    
    return {
      message: 'Workflow execution started',
      jobId: job.id,
      workflowId: workflow.id
    };
  }

  async startExtractionJob(jobId: number) {
    const job = await this.getExtractionJob(jobId);
    
    // Update the job status to running
    await this.updateExtractionJob(jobId, { 
      status: 'running',
      startedAt: new Date()
    });
    
    return {
      message: 'Extraction job started',
      jobId: jobId
    };
  }

  async stopExtractionJob(jobId: number) {
    const job = await this.getExtractionJob(jobId);
    
    // Update the job status to stopped
    await this.updateExtractionJob(jobId, { 
      status: 'stopped',
      completedAt: new Date()
    });
    
    return {
      message: 'Extraction job stopped',
      jobId: jobId
    };
  }

  async getExtractionStatus(jobId: number) {
    const job = await this.getExtractionJob(jobId);
    return {
      jobId: jobId,
      status: job.status,
      createdAt: job.createdAt,
      startedAt: job.startedAt,
      completedAt: job.completedAt
    };
  }

  async getExtractionResults(jobId: number) {
    // In a real implementation, this would fetch actual extraction results
    return {
      jobId: jobId,
      results: [],
      metadata: {
        extractedAt: new Date(),
        records: 0
      }
    };
  }
}