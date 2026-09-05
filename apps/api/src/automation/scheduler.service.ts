import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SchedulerService {
  constructor(private prisma: PrismaService) {}

  // Create a new schedule
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

  // Get all schedules
  async getAllSchedules() {
    return await this.prisma.automationSchedule.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Run a schedule immediately
  async runScheduleNow(scheduleId: number) {
    const schedule = await this.prisma.automationSchedule.update({
      where: { id: scheduleId },
      data: {
        lastRunAt: new Date(),
        nextRunAt: new Date(Date.now() + 60 * 1000), // Schedule for 1 minute from now
      },
    });

    return schedule;
  }

  // Enable/disable a schedule
  async toggleSchedule(scheduleId: number, isEnabled: boolean) {
    const schedule = await this.prisma.automationSchedule.update({
      where: { id: scheduleId },
      data: { isEnabled },
    });

    return schedule;
  }
}