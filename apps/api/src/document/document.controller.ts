import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DocumentProcessingService } from './document/document-processing.service';
import { Document, DocumentVersion, DocumentChunk, DocumentTag, DocumentClassification } from '@prisma/client';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentProcessingService) {}

  @Get()
  async getAllDocuments() {
    return await this.documentService.prisma.document.findMany({
      include: {
        source: true,
        entity: true
      }
    });
  }

  @Get(':id')
  async getDocument(@Param('id') id: number) {
    return await this.documentService.getDocumentById(id);
  }

  @Post()
  async createDocument(@Body() documentData: Partial<Document>) {
    return await this.documentService.createDocument(documentData);
  }

  @Put(':id')
  async updateDocument(@Param('id') id: number, @Body() documentData: Partial<Document>) {
    return await this.documentService.updateDocument(id, documentData);
  }

  @Delete(':id')
  async deleteDocument(@Param('id') id: number) {
    return await this.documentService.deleteDocument(id);
  }

  // Document versions endpoints
  @Get(':id/versions')
  async getDocumentVersions(@Param('id') id: number) {
    return await this.documentService.getDocumentVersions(id);
  }

  // Document chunks endpoints
  @Get(':id/chunks')
  async getDocumentChunks(@Param('id') id: number) {
    return await this.documentService.getDocumentChunks(id);
  }

  // Document tags endpoints
  @Get(':id/tags')
  async getDocumentTags(@Param('id') id: number) {
    return await this.documentService.getDocumentTags(id);
  }

  // Document classifications endpoints
  @Get(':id/classifications')
  async getDocumentClassifications(@Param('id') id: number) {
    return await this.documentService.getDocumentClassifications(id);
  }

  // Processing endpoints
  @Post('process')
  async processDocument(@Body() processData: any) {
    // This would trigger the document processing pipeline
    return { message: 'Document processing started', ...processData };
  }

  @Post('reprocess')
  async reprocessDocument(@Body() reprocessData: any) {
    // This would trigger a reprocessing of an existing document
    return { message: 'Document reprocessing started', ...reprocessData };
  }

  @Post(':id/chunk')
  async chunkDocument(@Param('id') id: number, @Body() chunkData: any) {
    // This would process the document into chunks
    return { message: 'Document chunking started', documentId: id, ...chunkData };
  }

  @Post(':id/classify')
  async classifyDocument(@Param('id') id: number, @Body() classifyData: any) {
    // This would classify the document
    return { message: 'Document classification started', documentId: id, ...classifyData };
  }
}
