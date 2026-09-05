import { Module } from '@nestjs/common';
import { HybridSearchService } from './hybrid-search.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HybridSearchService],
  exports: [HybridSearchService],
})
export class HybridSearchModule {}