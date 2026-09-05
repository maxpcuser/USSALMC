import { Module } from '@nestjs/common';
import { GovernanceService } from '../services/governance.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [GovernanceService, PrismaService],
  exports: [GovernanceService],
})
export class GovernanceModule {}