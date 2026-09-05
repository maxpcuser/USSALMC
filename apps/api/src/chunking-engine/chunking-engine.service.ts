import { Injectable } from '@nestjs/common';

export interface Chunk {
  id?: number;
  documentId: number;
  chunkIndex: number;
  chunkType: string;
  content: string;
  tokenCount?: number;
  characterCount?: number;
  metadata?: any;
  createdAt?: Date;
}

export interface ChunkingOptions {
  chunkSize?: number; // in tokens or characters
  overlap?: number;
  strategy?: 'fixed' | 'paragraph' | 'heading' | 'section' | 'hybrid';
  maxChunkLimit?: number;
}

@Injectable()
export class ChunkingEngineService {
  
  /**
   * Create chunks using fixed-size strategy
   */
  createFixedChunks(content: string, options: ChunkingOptions = {}): Chunk[] {
    const { chunkSize = 512, overlap = 0 } = options;
    const chunks: Chunk[] = [];
    
    if (!content) return chunks;
    
    const words = content.split(/\s+/);
    let index = 0;
    
    while (index < words.length) {
      const endIndex = Math.min(index + chunkSize, words.length);
      const chunkWords = words.slice(index, endIndex);
      
      chunks.push({
        documentId: 0, // Will be set later
        chunkIndex: chunks.length,
        chunkType: 'fixed',
        content: chunkWords.join(' '),
        characterCount: chunkWords.join(' ').length
      });
      
      index = endIndex - overlap;
    }
    
    return chunks;
  }

  /**
   * Create chunks based on paragraphs
   */
  createParagraphChunks(content: string, options: ChunkingOptions = {}): Chunk[] {
    const { maxChunkLimit = 1024 } = options;
    const chunks: Chunk[] = [];
    
    if (!content) return chunks;
    
    // Split by paragraph (double newline)
    const paragraphs = content.split(/
\s*
/);
    
    let currentChunkContent = '';
    
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i].trim();
      
      if (!paragraph) continue;
      
      // If adding this paragraph would exceed the limit, start a new chunk
      if (currentChunkContent && 
          (currentChunkContent.length + paragraph.length > maxChunkLimit)) {
        chunks.push({
          documentId: 0,
          chunkIndex: chunks.length,
          chunkType: 'paragraph',
          content: currentChunkContent.trim(),
          characterCount: currentChunkContent.length
        });
        
        currentChunkContent = '';
      }
      
      if (currentChunkContent) {
        currentChunkContent += '\n\n' + paragraph;
      } else {
        currentChunkContent = paragraph;
      }
    }
    
    // Add the last chunk if it exists
    if (currentChunkContent) {
      chunks.push({
        documentId: 0,
        chunkIndex: chunks.length,
        chunkType: 'paragraph',
        content: currentChunkContent.trim(),
        characterCount: currentChunkContent.length
      });
    }
    
    return chunks;
  }

  /**
   * Create chunks based on headings
   */
  createHeadingChunks(content: string): Chunk[] {
    const chunks: Chunk[] = [];
    
    if (!content) return chunks;
    
    // Split by headings (h1, h2, h3, etc.)
    const headingRegex = /^(#{1,6})\s+(.*)$/gm;
    let lastIndex = 0;
    let match;
    
    // Find all headings and their positions
    const headingPositions: { index: number; level: number; title: string }[] = [];
    
    while ((match = headingRegex.exec(content)) !== null) {
      headingPositions.push({
        index: match.index,
        level: match[1].length,
        title: match[2].trim()
      });
    }
    
    // Create chunks based on sections between headings
    for (let i = 0; i < headingPositions.length; i++) {
      const start = headingPositions[i].index;
      const end = i < headingPositions.length - 1 ? headingPositions[i + 1].index : content.length;
      
      if (end > start) {
        const chunkContent = content.substring(start, end).trim();
        if (chunkContent) {
          chunks.push({
            documentId: 0,
            chunkIndex: chunks.length,
            chunkType: 'heading',
            content: chunkContent,
            characterCount: chunkContent.length
          });
        }
      }
    }
    
    // If there's content before the first heading, add it as a separate chunk
    if (headingPositions.length > 0 && headingPositions[0].index > 0) {
      const firstChunk = content.substring(0, headingPositions[0].index).trim();
      if (firstChunk) {
        chunks.unshift({
          documentId: 0,
          chunkIndex: 0,
          chunkType: 'heading',
          content: firstChunk,
          characterCount: firstChunk.length
        });
      }
    }
    
    return chunks;
  }

  /**
   * Create hybrid chunks combining multiple strategies
   */
  createHybridChunks(content: string, options: ChunkingOptions = {}): Chunk[] {
    const { chunkSize = 512, maxChunkLimit = 1024 } = options;
    const chunks: Chunk[] = [];
    
    if (!content) return chunks;
    
    // First try to split by headings to create larger sections
    const headingChunks = this.createHeadingChunks(content);
    
    for (const chunk of headingChunks) {
      // If the chunk is too large, break it down using fixed size chunks
      if (chunk.content.length > maxChunkLimit) {
        const subChunks = this.createFixedChunks(chunk.content, { 
          chunkSize, 
          strategy: 'fixed' 
        });
        
        for (const subChunk of subChunks) {
         _chunks.push({
            ...subChunk,
            documentId: 0,
            chunkIndex: chunks.length
          });
        }
      } else {
        chunks.push({
          ...chunk,
          documentId: 0,
          chunkIndex: chunks.length
        });
      }
    }
    
    return chunks;
  }

  /**
   * Create token count for content
   */
  getTokenCount(content: string): number {
    // Simple approximation - in reality this would use a proper tokenizer
    if (!content) return 0;
    
    return content.split(/\s+/).length;
  }

  /**
   * Validate and prepare chunk metadata
   */
  prepareChunkMetadata(chunk: Chunk, documentId: number): Chunk {
    // Set the document id
    chunk.documentId = documentId;
    
    // Calculate token count if not already set
    if (!chunk.tokenCount) {
      chunk.tokenCount = this.getTokenCount(chunk.content);
    }
    
    // Set character count if not already set
    if (!chunk.characterCount) {
      chunk.characterCount = chunk.content.length;
    }
    
    // Add default metadata
    if (!chunk.metadata) {
      chunk.metadata = {};
    }
    
    return chunk;
  }

  /**
   * Chunk content using selected strategy
   */
  createChunks(content: string, options: ChunkingOptions = {}): Chunk[] {
    const { strategy = 'hybrid' } = options;
    let chunks: Chunk[] = [];
    
    switch (strategy) {
      case 'fixed':
        chunks = this.createFixedChunks(content, options);
        break;
      case 'paragraph':
        chunks = this.createParagraphChunks(content, options);
        break;
      case 'heading':
        chunks = this.createHeadingChunks(content);
        break;
      case 'hybrid':
      default:
        chunks = this.createHybridChunks(content, options);
        break;
    }
    
    return chunks;
  }
}
