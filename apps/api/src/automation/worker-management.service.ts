import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkerManagementService {
  constructor(private prisma: PrismaService) {}

  // Register a new worker node
  async registerWorker(name: string, workerType: string, configuration?: any) {
    const worker = await this.prisma.workerNode.create({
      data: {
        name,
        workerType,
        configuration,
      },
    });

    return worker;
  }

  // Update worker heartbeat
  async updateWorkerHeartbeat(workerId: number) {
    await this.prisma.workerNode.update({
      where: { id: workerId },
      data: {
        heartbeatAt: new Date(),
      },
    });
  }

  // Get all workers
  async getAllWorkers() {
    return await this.prisma.workerNode.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get worker statistics
  async getWorkerStatistics(workerId: number) {
    return await this.prisma.workerStatistic.findUnique({
      where: { workerNodeId: workerId },
    });
  }
}