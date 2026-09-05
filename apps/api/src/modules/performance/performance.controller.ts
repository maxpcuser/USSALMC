
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PerformanceService } from './performance.service';

@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Post('load-test')
  async runLoadTest(@Body() scenario: any) {
    return this.performanceService.runLoadTest(scenario);
  }

  @Post('stress-test')
  async runStressTest(@Body() target: { system: string }) {
    return this.performanceService.runStressTest(target.system);
  }

  @Get('capacity-report')
  async generateCapacityReport() {
    return this.performanceService.generateCapacityReport();
  }
}
