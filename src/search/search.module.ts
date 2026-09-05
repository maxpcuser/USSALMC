import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { KeywordSearchModule } from './keyword-search.module';
import { VectorSearchModule } from './vector-search.module';
import { HybridSearchModule } from './hybrid-search.module';
import { RankingModule } from './ranking.module';
import { FilterModule } from './filter.module';
import { MetadataSearchModule } from './metadata-search.module';
import { RelationshipSearchModule } from './relationship-search.module';
import { QueryAnalysisModule } from './query-analysis.module';
import { SearchStatisticsModule } from './search-statistics.module';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
    }),
    KeywordSearchModule,
    VectorSearchModule,
    HybridSearchModule,
    RankingModule,
    FilterModule,
    MetadataSearchModule,
    RelationshipSearchModule,
    QueryAnalysisModule,
    SearchStatisticsModule,
  ],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService, KeywordSearchModule, VectorSearchModule, HybridSearchModule],
})
export class SearchModule {}