import { Module } from '@nestjs/common';
import { BackupService } from '../services/backup.service';
import { PrismaService } from '../../../prisma.service';

@Module({
  providers: [BackupService, PrismaService],
  exports: [BackupService],
})
export class BackupModule {}