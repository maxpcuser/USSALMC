import { Module } from '@nestjs/common';
import { RollbackService } from '../services/rollback.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [RollbackService, PrismaService],
  exports: [RollbackService],
})
export class RollbackModule {}