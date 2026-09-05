import { Module } from '@nestjs/common';
import { TemplateModule } from './template/template.module';
import { TemplateBuilderModule } from './template-builder/template-builder.module';
import { TemplateTestModule } from './template-test/template-test.module';

@Module({
  imports: [
    TemplateModule,
    TemplateBuilderModule,
    TemplateTestModule,
  ],
})
export class TemplateCoreModule {}