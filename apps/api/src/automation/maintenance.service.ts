import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  // Create a new maintenance task
  async createMaintenanceTask(name: string, taskType: string, frequency: string, configuration?: any) {
    const task = await this.prisma.systemMaintenanceTask.create({
      data: {
        name,
        taskType,
        frequency,
        configuration,
      },
    });

    return task;
  }

  // Get all maintenance tasks
  async getAllMaintenanceTasks() {
    return await this.prisma.systemMaintenanceTask.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Run a maintenance task immediately
  async runMaintenanceTask(taskId: number) {
    const task = await this.prisma.systemMaintenanceTask.update({
      where: { id: taskId },
      data: {
        lastRun: new Date(),
        nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000), // Schedule for tomorrow
      },
    });

    return task;
  }
}