import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentNormalizationService {
  
  /**
   * Convert HTML to Markdown format
   */
  htmlToMarkdown(html: string): string {
    if (!html) return '';
    
    // Basic HTML to markdown conversion
    let markdown = html;
    
    // Convert headings
    markdown = markdown.replace(/<h1>(.*?)<\/h1>/gi, '# $1');
    markdown = markdown.replace(/<h2>(.*?)<\/h2>/gi, '## $1');
    markdown = markdown.replace(/<h3>(.*?)<\/h3>/gi, '### $1');
    
    // Convert bold and italic
    markdown = markdown.replace(/<b>(.*?)<\/b>/gi, '**$1**');
    markdown = markdown.replace(/<strong>(.*?)<\/strong>/gi, '**$1**');
    markdown = markdown.replace(/<i>(.*?)<\/i>/gi, '*$1*');
    markdown = markdown.replace(/<em>(.*?)<\/em>/gi, '*$1*');
    
    // Convert lists
    markdown = markdown.replace(/<ul>(.*?)<\/ul>/gi, '$1');
    markdown = markdown.replace(/<ol>(.*?)<\/ol>/gi, '$1');
    markdown = markdown.replace(/<li>(.*?)<\/li>/gi, '- $1');
    
    // Convert paragraphs
    markdown = markdown.replace(/<p>(.*?)<\/p>/gi, '$1

');
    
    // Convert links
    markdown = markdown.replace(/<a\s+href=['"](.*?)['"].*?>(.*?)<\/a>/gi, '[$2]($1)');
    
    // Remove remaining HTML tags
    markdown = markdown.replace(/<[^>]*>/g, '');
    
    return markdown;
  }

  /**
   * Extract metadata from content (titles, headings, etc.)
   */
  extractMetadata(content: string): any {
    if (!content) return {};
    
    const metadata: any = {};
    
    // Extract title if present
    const titleMatch = content.match(/^#\s+(.*)/m);
    if (titleMatch && titleMatch[1]) {
      metadata.title = titleMatch[1].trim();
    }
    
    // Extract headings as section titles
    const headings: string[] = [];
    const headingMatches = content.match(/^(#{1,6})\s+(.*$)/gm);
    
    if (headingMatches) {
      for (const match of headingMatches) {
        const level = match.match(/^#+/)[0].length;
        const title = match.replace(/^#+\s+/, '').trim();
        headings.push({ level, title });
      }
    }
    
    metadata.headings = headings;
    
    // Extract lists
    const listItems: string[] = [];
    const listMatches = content.match(/^- (.*)/gm);
    
    if (listMatches) {
      for (const match of listMatches) {
        listItems.push(match.replace(/^- /, '').trim());
      }
    }
    
    metadata.listItems = listItems;
    
    // Extract tables if any
    const tableMatches = content.match(/\|.*?\|[\s\S]*?\|/g);
    if (tableMatches) {
      metadata.tables = tableMatches;
    }
    
    // Extract links if any
    const linkMatches = content.match(/\[([^\]]+)\]\(([^)]+)\)/g);
    if (linkMatches) {
      metadata.links = linkMatches.map(l => l.replace(/\[([^\]]+)\]\(([^)]+)\)/, '$2'));
    }
    
    return metadata;
  }

  /**
   * Normalize document structure and format
   */
  normalizeDocumentStructure(content: string): string {
    if (!content) return '';
    
    let normalized = content;
    
    // Ensure proper paragraph breaks
    normalized = normalized.replace(/(
\s*){3,}/g, '

');
    
    // Normalize blank lines
    normalized = normalized.replace(/
{2,}/g, '

');
    
    // Trim whitespace
    normalized = normalized.trim();
    
    return normalized;
  }

  /**
   * Perform comprehensive normalization on document content
   */
  normalizeDocumentContent(content: string): { markdown: string; metadata: any } {
    if (!content) {
      return { 
        markdown: '', 
        metadata: {} 
      };
    }
    
    // Convert to markdown
    const markdown = this.htmlToMarkdown(content);
    
    // Extract metadata
    const metadata = this.extractMetadata(markdown);
    
    // Normalize structure
    const normalized = this.normalizeDocumentStructure(markdown);
    
    return {
      markdown: normalized,
      metadata: metadata
    };
  }
}
