import { Module } from '@nestjs/common';
import { TemplateTestController } from './template-test.controller';
import { TemplateTestService } from './template-test.service';
import { TemplateTestRepository } from './template-test.repository';

@Module({
  controllers: [TemplateTestController],
  providers: [TemplateTestService, TemplateTestRepository],
  exports: [TemplateTestService, TemplateTestRepository],
})
export class TemplateTestModule {}