import { Module } from '@nestjs/common';
import { CorpusService } from './corpus.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [CorpusService, PrismaService],
  exports: [CorpusService],
})
export class CorpusModule {}
