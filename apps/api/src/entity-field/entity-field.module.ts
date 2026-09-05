import { Module } from '@nestjs/common';
import { EntityFieldController } from './entity-field.controller';
import { EntityFieldService } from './entity-field.service';
import { EntityFieldRepository } from './entity-field.repository';

@Module({
  controllers: [EntityFieldController],
  providers: [EntityFieldService, EntityFieldRepository],
  exports: [EntityFieldService, EntityFieldRepository],
})
export class EntityFieldModule {}