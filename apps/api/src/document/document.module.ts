import { Module } from '@nestjs/common';
import { DocumentProcessingService } from './document/document-processing.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [DocumentProcessingService, PrismaService],
  exports: [DocumentProcessingService],
})
export class DocumentModule {}
