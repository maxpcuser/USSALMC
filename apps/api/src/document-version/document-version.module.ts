import { Module } from '@nestjs/common';
import { DocumentVersionService } from './document-version.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [DocumentVersionService, PrismaService],
  exports: [DocumentVersionService],
})
export class DocumentVersionModule {}
