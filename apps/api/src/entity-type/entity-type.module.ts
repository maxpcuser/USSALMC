import { Module } from '@nestjs/common';
import { EntityTypeController } from './entity-type.controller';
import { EntityTypeService } from './entity-type.service';
import { EntityTypeRepository } from './entity-type.repository';

@Module({
  controllers: [EntityTypeController],
  providers: [EntityTypeService, EntityTypeRepository],
  exports: [EntityTypeService, EntityTypeRepository],
})
export class EntityTypeModule {}