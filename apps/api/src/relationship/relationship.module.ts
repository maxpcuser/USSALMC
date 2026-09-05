import { Module } from '@nestjs/common';
import { RelationshipController } from './relationship.controller';
import { RelationshipService } from './relationship.service';
import { RelationshipRepository } from './relationship.repository';

@Module({
  controllers: [RelationshipController],
  providers: [RelationshipService, RelationshipRepository],
  exports: [RelationshipService, RelationshipRepository],
})
export class RelationshipModule {}