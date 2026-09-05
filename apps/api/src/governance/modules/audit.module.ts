import { Module } from '@nestjs/common';
import { AuditService } from '../services/audit.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [AuditService, PrismaService],
  exports: [AuditService],
})
export class AuditModule {}