import { Module } from '@nestjs/common';
import { SourceController } from './source.controller';
import { SourceService } from './source.service';
import { SourceRepository } from './source.repository';

@Module({
  controllers: [SourceController],
  providers: [SourceService, SourceRepository],
  exports: [SourceService, SourceRepository],
})
export class SourceModule {}