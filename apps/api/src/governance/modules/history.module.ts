import { Module } from '@nestjs/common';
import { HistoryService } from '../services/history.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [HistoryService, PrismaService],
  exports: [HistoryService],
})
export class HistoryModule {}