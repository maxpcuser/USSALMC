import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { 
  DocumentProcessingService,
  DocumentVersionService,
  ChunkingService, 
  ClassificationService,
  CorpusService,
  DocumentCleaningService,
  DocumentNormalizationService,
  ChunkingEngineService,
  ClassificationEngineService,
  DocumentSearchPreparationService,
  QueueService,
  DocumentProcessingPipelineService
} from '../document';

// Import all individual services
import { DocumentModule } from './document/document.module';
import { DocumentVersionModule } from './document-version/document-version.module';
import { ChunkingModule } from './chunking/chunking.module';
import { ClassificationModule } from './classification/classification.module';
import { CorpusModule } from './corpus/corpus.module';
import { DocumentCleaningModule } from './document-cleaning/document-cleaning.module';
import { DocumentNormalizationModule } from './document-normalization/document-normalization.module';
import { ChunkingEngineModule } from './chunking-engine/chunking-engine.module';
import { ClassificationEngineModule } from './classification-engine/classification-engine.module';
import { SearchPreparationModule } from './search-preparation/search-preparation.module';
import { QueueModule } from './queue/queue.module';
import { DocumentProcessingPipelineModule } from './pipeline/document-processing-pipeline.module';

@Module({
  imports: [
    DocumentModule,
    DocumentVersionModule,
    ChunkingModule,
    ClassificationModule,
    CorpusModule,
    DocumentCleaningModule,
    DocumentNormalizationModule,
    ChunkingEngineModule,
    ClassificationEngineModule,
    SearchPreparationModule,
    QueueModule,
    DocumentProcessingPipelineModule
  ],
  providers: [
    PrismaService,
    DocumentProcessingService,
    DocumentVersionService,
    ChunkingService,
    ClassificationService,
    CorpusService,
    DocumentCleaningService,
    DocumentNormalizationService,
    ChunkingEngineService,
    ClassificationEngineService,
    DocumentSearchPreparationService,
    QueueService,
    DocumentProcessingPipelineService
  ],
  exports: [
    DocumentProcessingService,
    DocumentVersionService,
    ChunkingService,
    ClassificationService,
    CorpusService,
    DocumentCleaningService,
    DocumentNormalizationService,
    ChunkingEngineService,
    ClassificationEngineService,
    DocumentSearchPreparationService,
    QueueService,
    DocumentProcessingPipelineService
  ]
})
export class DocumentProcessingModule {}
