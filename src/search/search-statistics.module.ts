import { Module } from '@nestjs/common';
import { SearchStatisticsService } from './search-statistics.service';

@Module({
  providers: [SearchStatisticsService],
  exports: [SearchStatisticsService],
})
export class SearchStatisticsModule {}