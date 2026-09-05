import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AutomationService } from './automation.service';
import { SchedulerService } from './scheduler.service';
import { WorkerManagementService } from './worker-management.service';
import { MaintenanceService } from './maintenance.service';

@Module({
  imports: [PrismaModule],
  providers: [
    AutomationService, 
    SchedulerService,
    WorkerManagementService,
    MaintenanceService
  ],
  exports: [
    AutomationService,
    SchedulerService,
    WorkerManagementService,
    MaintenanceService
  ],
})
export class AutomationModule {}