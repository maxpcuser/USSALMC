import { Module } from '@nestjs/common';
import { MetadataSearchService } from './metadata-search.service';

@Module({
  providers: [MetadataSearchService],
  exports: [MetadataSearchService],
})
export class MetadataSearchModule {}