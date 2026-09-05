import { Module } from '@nestjs/common';
import { DiscoveryController } from './discovery.controller';
import { DiscoveryService } from './discovery.service';
import { DiscoveryJobService } from './discovery-job.service';
import { DiscoveryRuleService } from './discovery-rule.service';
import { DiscoveryCandidateService } from './discovery-candidate.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DiscoveryController],
  providers: [
    DiscoveryService,
    DiscoveryJobService,
    DiscoveryRuleService,
    DiscoveryCandidateService
  ],
  exports: [
    DiscoveryService,
    DiscoveryJobService,
    DiscoveryRuleService,
    DiscoveryCandidateService
  ]
})
export class DiscoveryModule {}