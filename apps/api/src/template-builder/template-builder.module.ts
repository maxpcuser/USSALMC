import { Module } from '@nestjs/common';
import { TemplateBuilderController } from './template-builder.controller';
import { TemplateBuilderService } from './template-builder.service';
import { TemplateBuilderRepository } from './template-builder.repository';

@Module({
  controllers: [TemplateBuilderController],
  providers: [TemplateBuilderService, TemplateBuilderRepository],
  exports: [TemplateBuilderService, TemplateBuilderRepository],
})
export class TemplateBuilderModule {}