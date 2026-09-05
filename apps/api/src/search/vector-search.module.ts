import { Module } from '@nestjs/common';
import { VectorSearchService } from './vector-search.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [VectorSearchService],
  exports: [VectorSearchService],
})
export class VectorSearchModule {}