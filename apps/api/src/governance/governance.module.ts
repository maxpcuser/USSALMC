import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditModule } from './modules/audit.module';
import { ApprovalModule } from './modules/approval.module';
import { HistoryModule } from './modules/history.module';
import { RollbackModule } from './modules/rollback.module';
import { GovernanceModule } from './modules/governance.module';

@Module({
  imports: [
    AuditModule,
    ApprovalModule,
    HistoryModule,
    RollbackModule,
    GovernanceModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class GovernanceModule {}