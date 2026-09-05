import { Module } from '@nestjs/common';
import { SourceModule } from './source/source.module';
import { EntityTypeModule } from './entity-type/entity-type.module';
import { EntityFieldModule } from './entity-field/entity-field.module';
import { EntityModule } from './entity/entity.module';
import { RelationshipModule } from './relationship/relationship.module';
import { SettingsModule } from './settings/settings.module';
import { AuditModule } from './audit/audit.module';
import { ExtractionModule } from './extraction/extraction.module';

@Module({
  imports: [
    SourceModule,
    EntityTypeModule,
    EntityFieldModule,
    EntityModule,
    RelationshipModule,
    SettingsModule,
    AuditModule,
    ExtractionModule,
  ],
})
export class AppModule {}