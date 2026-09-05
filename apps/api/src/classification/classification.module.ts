import { Module } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ClassificationService, PrismaService],
  exports: [ClassificationService],
})
export class ClassificationModule {}
