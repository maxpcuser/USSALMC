import { Module } from '@nestjs/common';
import { HybridSearchService } from './hybrid-search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
    }),
  ],
  providers: [HybridSearchService],
  exports: [HybridSearchService],
})
export class HybridSearchModule {}