import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentCleaningService {
  
  /**
   * Clean HTML content by removing scripts, styles, and other unwanted elements
   */
  cleanHtmlContent(html: string): string {
    if (!html) return '';
    
    // Remove script tags
    html = html.replace(/<script[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Remove style tags
    html = html.replace(/<style[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    
    // Remove other unwanted elements
    html = html.replace(/<head[^<]*(?:(?!<\/head>)<[^<]*)*<\/head>/gi, '');
    html = html.replace(/<nav[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '');
    html = html.replace(/<footer[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '');
    
    // Clean up extra whitespace
    html = html.replace(/\s+/g, ' ').trim();
    
    return html;
  }

  /**
   * Normalize whitespace and handle character encoding issues
   */
  normalizeContent(content: string): string {
    if (!content) return '';
    
    // Replace multiple spaces with single space
    content = content.replace(/\s+/g, ' ');
    
    // Remove or replace special characters
    content = content.replace(/[
	]/g, ' ');
    
    // Normalize line breaks
    content = content.replace(/
{3,}/g, '

');
    
    return content.trim();
  }

  /**
   * Remove duplicate lines from content
   */
  removeDuplicateLines(content: string): string {
    if (!content) return '';
    
    const lines = content.split('
');
    const seen = new Set();
    const uniqueLines = [];
    
    for (const line of lines) {
      if (!seen.has(line.trim())) {
        seen.add(line.trim());
        uniqueLines.push(line);
      }
    }
    
    return uniqueLines.join('
');
  }

  /**
   * Perform comprehensive cleaning on raw document content
   */
  cleanDocumentContent(rawContent: string): string {
    if (!rawContent) return '';
    
    // Apply all cleaning operations in sequence
    let cleaned = rawContent;
    
    // 1. Remove HTML elements
    cleaned = this.cleanHtmlContent(cleaned);
    
    // 2. Normalize whitespace and encoding
    cleaned = this.normalizeContent(cleaned);
    
    // 3. Remove duplicate lines
    cleaned = this.removeDuplicateLines(cleaned);
    
    return cleaned;
  }
}
