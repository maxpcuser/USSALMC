import { Module } from '@nestjs/common';
import { RelationshipSearchService } from './relationship-search.service';

@Module({
  providers: [RelationshipSearchService],
  exports: [RelationshipSearchService],
})
export class RelationshipSearchModule {}