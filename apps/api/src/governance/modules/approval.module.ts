import { Module } from '@nestjs/common';
import { ApprovalService } from '../services/approval.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [ApprovalService, PrismaService],
  exports: [ApprovalService],
})
export class ApprovalModule {}