import { Module } from '@nestjs/common';
import { KeywordSearchService } from './keyword-search.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [KeywordSearchService],
  exports: [KeywordSearchService],
})
export class KeywordSearchModule {}