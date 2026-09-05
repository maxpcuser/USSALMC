import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentSearchPreparationService {
  constructor(private prisma: PrismaService) {}

  /**
   * Prepare document metadata for search indexing
   */
  async prepareDocumentForSearch(documentId: number): Promise<any> {
    // Fetch the document with its chunks and related information
    const document = await this.prisma.document.findUnique({
      where: { id: documentId },
      include: {
        chunks: true,
        tags: true,
        classifications: true,
        entity: true
      }
    });

    if (!document) {
      throw new Error(`Document with ID ${documentId} not found`);
    }

    // Prepare metadata structure for search
    const searchMetadata = {
      id: document.id,
      title: document.title,
      url: document.url,
      content: document.cleanContent,
      rawContent: document.rawContent,
      language: document.language,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
      sourceId: document.sourceId,
      entityId: document.entityId,
      processingStatus: document.processingStatus,
      chunks: document.chunks.map(chunk => ({
        id: chunk.id,
        index: chunk.chunkIndex,
        content: chunk.content,
        type: chunk.chunkType,
        tokenCount: chunk.tokenCount,
        characterCount: chunk.characterCount
      })),
      tags: document.tags.map(tag => tag.tag),
      classifications: document.classifications.map(classification => ({
        type: classification.classificationType,
        value: classification.classificationValue,
        confidence: classification.confidence
      })),
      entityName: document.entity?.name || null,
      entitySlug: document.entity?.slug || null
    };

    return searchMetadata;
  }

  /**
   * Generate embeddings-ready content from document
   */
  async prepareEmbeddingsContent(documentId: number): Promise<string> {
    const document = await this.prisma.document.findUnique({
      where: { id: documentId },
      include: {
        chunks: true
      }
    });

    if (!document) {
      throw new Error(`Document with ID ${documentId} not found`);
    }

    // Combine all content for embedding generation
    let combinedContent = '';
    
    if (document.cleanContent) {
      combinedContent += document.cleanContent + '\n\n';
    }
    
    if (document.title) {
      combinedContent += '# ' + document.title + '\n\n';
    }
    
    // Add all chunks to the content
    for (const chunk of document.chunks) {
      combinedContent += chunk.content + '\n\n';
    }
    
    return combinedContent.trim();
  }

  /**
   * Prepare full text search index
   */
  async prepareFullTextIndex(documentId: number): Promise<any> {
    const document = await this.prisma.document.findUnique({
      where: { id: documentId },
      include: {
        tags: true,
        classifications: true
      }
    });

    if (!document) {
      throw new Error(`Document with ID ${documentId} not found`);
    }

    // Create full text searchable content by combining:
    // - Title
    // - Clean content  
    // - Tags
    // - Classifications
    
    let fullTextContent = '';
    
    if (document.title) {
      fullTextContent += document.title + ' ';
    }
    
    if (document.cleanContent) {
      fullTextContent += document.cleanContent + ' ';
    }
    
    // Add tags 
    for (const tag of document.tags) {
      fullTextContent += tag.tag + ' ';
    }
    
    // Add classification values
    for (const classification of document.classifications) {
      fullTextContent += classification.classificationValue + ' ';
    }
    
    return {
      id: documentId,
      content: fullTextContent.trim(),
      title: document.title,
      url: document.url
    };
  }
}
