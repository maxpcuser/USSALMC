import { Module } from '@nestjs/common';
import { ChunkingService } from './chunking.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ChunkingService, PrismaService],
  exports: [ChunkingService],
})
export class ChunkingModule {}
