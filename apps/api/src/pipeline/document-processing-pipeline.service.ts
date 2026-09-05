import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentCleaningService } from '../document-cleaning/document-cleaning.service';
import { DocumentNormalizationService } from '../document-normalization/document-normalization.service'; 
import { ChunkingEngineService, Chunk } from '../chunking-engine/chunking-engine.service';
import { ClassificationEngineService } from '../classification-engine/classification-engine.service';
import { DocumentSearchPreparationService } from '../search-preparation/document-search-preparation.service';

export interface ProcessingPipelineOptions {
  cleanContent?: boolean;
  normalizeContent?: boolean;
  chunkContent?: boolean;
  classifyContent?: boolean;
  prepareForSearch?: boolean;
  generateEmbeddings?: boolean;
}

@Injectable()
export class DocumentProcessingPipelineService {
  
  constructor(
    private prisma: PrismaService,
    private cleaningService: DocumentCleaningService,
    private normalizationService: DocumentNormalizationService,
    private chunkingEngine: ChunkingEngineService,
    private classificationEngine: ClassificationEngineService,
    private searchPreparation: DocumentSearchPreparationService
  ) {}

  /**
   * Process a document through the complete pipeline
   */
  async processDocument(documentId: number, options: ProcessingPipelineOptions = {}): Promise<any> {
    // Fetch the document
    const document = await this.prisma.document.findUnique({
      where: { id: documentId }
    });

    if (!document) {
      throw new Error(`Document with ID ${documentId} not found`);
    }

    let processedDocument = { ...document };

    // Step 1: Clean content
    if (options.cleanContent !== false && document.rawContent) {
      console.log(`Cleaning content for document ${documentId}`);
      processedDocument.cleanContent = this.cleaningService.cleanDocumentContent(document.rawContent);
      
      // Update document with clean content
      await this.prisma.document.update({
        where: { id: documentId },
        data: { 
          cleanContent: processedDocument.cleanContent,
          processingStatus: 'Cleaned'
        }
      });
    }

    // Step 2: Normalize content (convert to markdown, etc.)
    if (options.normalizeContent !== false && processedDocument.cleanContent) {
      console.log(`Normalizing content for document ${documentId}`);
      const normalized = this.normalizationService.normalizeDocumentContent(
        processedDocument.cleanContent
      );
      
      processedDocument.markdownContent = normalized.markdown;
      
      // Update document with normalized content
      await this.prisma.document.update({
        where: { id: documentId },
        data: { 
          markdownContent: processedDocument.markdownContent,
          processingStatus: 'Normalized'
        }
      });
    }

    // Step 3: Chunk content for semantic search
    if (options.chunkContent !== false && processedDocument.markdownContent) {
      console.log(`Chunking content for document ${documentId}`);
      
      const chunks = this.chunkingEngine.createChunks(processedDocument.markdownContent, {
        chunkSize: 512,
        strategy: 'hybrid'
      });
      
      // Save chunks
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        
        await this.prisma.documentChunk.create({
          data: {
            documentId,
            chunkIndex: chunk.chunkIndex,
            content: chunk.content,
            chunkType: chunk.chunkType,
            characterCount: chunk.characterCount,
            tokenCount: chunk.tokenCount
          }
        });
      }
      
      // Update document status
      await this.prisma.document.update({
        where: { id: documentId },
        data: { 
          processingStatus: 'Chunked'
        }
      });
    }

    // Step 4: Classify document
    if (options.classifyContent !== false) {
      console.log(`Classifying content for document ${documentId}`);
      
      // Get all entities for association
      const entities = await this.prisma.entity.findMany({
        select: { id: true, name: true }
      });
      
      // Perform classification
      const classifications = this.classificationEngine.classifyDocument(
        documentId,
        processedDocument.markdownContent || '',
        entities
      );
      
      // Save classifications
      for (const classification of classifications) {
        await this.prisma.documentClassification.create({
          data: {
            documentId,
            classificationType: classification.classificationType,
            classificationValue: classification.classificationValue,
            confidence: classification.confidence,
            metadata: classification.metadata || {}
          }
        });
      }
      
      // Update document status
      await this.prisma.document.update({
        where: { id: documentId },
        data: { 
          processingStatus: 'Classified'
        }
      });
    }

    // Step 5: Prepare for search
    if (options.prepareForSearch !== false) {
      console.log(`Preparing document ${documentId} for search`);
      
      await this.searchPreparation.prepareDocumentForSearch(documentId);
      
      // Update document status
      await this.prisma.document.update({
        where: { id: documentId },
        data: { 
          processingStatus: 'Search Prepared'
        }
      });
    }

    // Final update to completed status
    await this.prisma.document.update({
      where: { id: documentId },
      data: { 
        processingStatus: 'Completed',
        updatedAt: new Date()
      }
    });

    return {
      success: true,
      documentId,
      status: 'Completed'
    };
  }

  /**
   * Process document with specific actions
   */
  async processDocumentSpecific(documentId: number, actions: string[]): Promise<any> {
    const options: ProcessingPipelineOptions = {};
    
    // Map the specific actions to pipeline options
    if (actions.includes('clean')) options.cleanContent = true;
    if (actions.includes('normalize')) options.normalizeContent = true;
    if (actions.includes('chunk')) options.chunkContent = true;
    if (actions.includes('classify')) options.classifyContent = true;
    if (actions.includes('search')) options.prepareForSearch = true;
    
    return await this.processDocument(documentId, options);
  }

  /**
   * Re-process a document (for updates)
   */
  async reprocessDocument(documentId: number): Promise<any> {
    // First, delete existing processed data
    const doc = await this.prisma.document.findUnique({
      where: { id: documentId },
      include: {
        chunks: true,
        classifications: true
      }
    });

    if (doc) {
      // Delete all related records
      await this.prisma.documentChunk.deleteMany({ where: { documentId } });
      await this.prisma.documentClassification.deleteMany({ where: { documentId } });
      
      // Reset document state for reprocessing
      await this.prisma.document.update({
        where: { id: documentId },
        data: {
          cleanContent: null,
          markdownContent: null,
          processingStatus: 'Pending',
          updatedAt: new Date()
        }
      });
    }

    // Now process as new
    return await this.processDocument(documentId);
  }
}
