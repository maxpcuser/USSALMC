
import { Controller, Get, Param } from '@nestjs/common';
import { ValidationService } from './validation.service';

@Controller('testing')
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Get('validate/:suite')
  async validateSuite(@Param('suite') suite: string) {
    return this.validationService.runValidationSuite(suite);
  }

  @Get('results/:runId')
  async getResults(@Param('runId') runId: string) {
    return this.validationService.getValidationResults(runId);
  }
}
