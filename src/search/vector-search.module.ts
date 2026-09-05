import { Module } from '@nestjs/common';
import { VectorSearchService } from './vector-search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
    }),
  ],
  providers: [VectorSearchService],
  exports: [VectorSearchService],
})
export class VectorSearchModule {}