import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AutomationService {
  constructor(private prisma: PrismaService) {}

  // Create a new automation schedule
  async createSchedule(name: string, description: string, scheduleType: string, 
                      cronExpression?: string, timezone?: string) {
    const schedule = await this.prisma.automationSchedule.create({
      data: {
        name,
        description,
        scheduleType,
        cronExpression,
        timezone,
        isEnabled: true,
      },
    });

    return schedule;
  }

  // Create a new automation job
  async createJob(name: string, jobType: string, scheduleId?: number, configuration?: any) {
    const job = await this.prisma.automationJob.create({
      data: {
        name,
        jobType,
        scheduleId,
        configuration,
      },
    });

    return job;
  }

  // Get all automation schedules
  async getAllSchedules() {
    return await this.prisma.automationSchedule.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get all automation jobs
  async getAllJobs() {
    return await this.prisma.automationJob.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        automationSchedule: true,
      },
    });
  }
}