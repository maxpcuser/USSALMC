import { Module } from '@nestjs/common';
import { QueryAnalysisService } from './query-analysis.service';

@Module({
  providers: [QueryAnalysisService],
  exports: [QueryAnalysisService],
})
export class QueryAnalysisModule {}