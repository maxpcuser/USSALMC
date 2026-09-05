import { Injectable } from '@nestjs/common';

export interface ClassificationResult {
  id?: number;
  documentId: number;
  classificationType: string;
  classificationValue: string;
  confidence: number;
  metadata?: any;
  createdAt?: Date;
}

export interface ClassificationOptions {
  sourceClassification?: boolean;
  documentClassification?: boolean;
  contentCategorization?: boolean;
  tagAssignment?: boolean;
  entityAssociation?: boolean;
}

@Injectable()
export class ClassificationEngineService {
  
  /**
   * Classify based on source domain
   */
  classifySourceDomain(documentUrl: string): string {
    if (!documentUrl) return 'unknown';
    
    try {
      const url = new URL(documentUrl);
      const hostname = url.hostname;
      
      // Common domains categorization 
      if (hostname.includes('gov') || hostname.includes('government')) {
        return 'government';
      } else if (hostname.includes('edu')) {
        return 'education';
      } else if (hostname.includes('org')) {
        return 'organization';
      } else if (hostname.includes('company') || hostname.includes('corp')) {
        return 'corporate';
      } else if (hostname.includes('news') || hostname.includes('media')) {
        return 'media';
      } else if (hostname.includes('research') || hostname.includes('academia')) {
        return 'academic';
      } else {
        return 'web';
      }
    } catch (error) {
      return 'unknown';
    }
  }

  /**
   * Classify document content based on keywords
   */
  classifyDocumentContent(content: string, keywords: { [key: string]: string[] }): string {
    if (!content) return 'uncategorized';
    
    const lowerContent = content.toLowerCase();
    let bestMatch = 'uncategorized';
    let maxMatches = 0;
    
    for (const [category, categoryKeywords] of Object.entries(keywords)) {
      let matchCount = 0;
      
      for (const keyword of categoryKeywords) {
        if (lowerContent.includes(keyword.toLowerCase())) {
          matchCount++;
        }
      }
      
      if (matchCount > maxMatches) {
        maxMatches = matchCount;
        bestMatch = category;
      }
    }
    
    return maxMatches > 0 ? bestMatch : 'uncategorized';
  }

  /**
   * Generate tags for document content
   */
  generateTags(content: string, options?: { maxTags?: number }): string[] {
    if (!content) return [];
    
    const { maxTags = 5 } = options || {};
    
    // Simple keyword extraction based on common English words that might be important
    const contentWords = content.toLowerCase().split(/\W+/);
    
    // Remove stop words and common words
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
      'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 
      'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
      'can', 'may', 'might', 'this', 'that', 'these', 'those'
    ]);
    
    const wordFrequency: { [key: string]: number } = {};
    
    for (const word of contentWords) {
      if (word.length > 3 && !stopWords.has(word)) {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      }
    }
    
    // Sort by frequency and get top tags
    const sortedWords = Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxTags)
      .map(entry => entry[0]);
    
    return sortedWords;
  }

  /**
   * Associate document with entities based on content
   */
  associateWithEntities(content: string, entities: any[]): string[] {
    if (!content || !entities || entities.length === 0) return [];
    
    const associatedEntityIds: string[] = [];
    
    // Simple text matching to find entity associations
    const lowerContent = content.toLowerCase();
    
    for (const entity of entities) {
      const entityName = entity.name?.toLowerCase() || '';
      
      if (lowerContent.includes(entityName)) {
        associatedEntityIds.push(entity.id);
      }
    }
    
    return associatedEntityIds;
  }

  /**
   * Perform comprehensive classification of document
   */
  classifyDocument(documentId: number, content: string, entities: any[], options: ClassificationOptions = {}): ClassificationResult[] {
    const classifications: ClassificationResult[] = [];
    
    // Source classification 
    if (options.sourceClassification !== false) {
      const sourceType = this.classifySourceDomain(content);
      classifications.push({
        documentId,
        classificationType: 'source',
        classificationValue: sourceType,
        confidence: 0.8, // High confidence for domain analysis
        metadata: { source: content }
      });
    }
    
    // Content categorization
    if (options.contentCategorization !== false) {
      // Keywords for categorization
      const categoryKeywords: { [key: string]: string[] } = {
        'technology': ['software', 'hardware', 'digital', 'tech', 'computer', 'application'],
        'science': ['research', 'study', 'experiment', 'scientific', 'biological', 'chemical'],
        'business': ['company', 'corporation', 'market', 'financial', 'economy', 'investment'],
        'health': ['medical', 'healthcare', 'medicine', 'hospital', 'patient'],
        'education': ['school', 'university', 'student', 'learning', 'academic'],
        'politics': ['government', 'policy', 'legislation', 'political', 'democracy']
      };
      
      const category = this.classifyDocumentContent(content, categoryKeywords);
      classifications.push({
        documentId,
        classificationType: 'content',
        classificationValue: category,
        confidence: 0.6
      });
    }
    
    // Tag assignment
    if (options.tagAssignment !== false) {
      const tags = this.generateTags(content);
      for (const tag of tags) {
        classifications.push({
          documentId,
          classificationType: 'tag',
          classificationValue: tag,
          confidence: 0.5
        });
      }
    }
    
    // Entity association
    if (options.entityAssociation !== false && entities && entities.length > 0) {
      const associatedEntities = this.associateWithEntities(content, entities);
      for (const entityId of associatedEntities) {
        classifications.push({
          documentId,
          classificationType: 'entity',
          classificationValue: entityId.toString(),
          confidence: 0.7
        });
      }
    }
    
    return classifications;
  }

  /**
   * Validate classification results
   */
  validateClassification(classification: ClassificationResult): boolean {
    return classification.documentId !== undefined && 
           classification.classificationType !== undefined && 
           classification.classificationValue !== undefined;
  }

  /**
   * Get confidence score for classification
   */
  getConfidenceScore(type: string, content: string): number {
    // A basic confidence scoring system
    
    let confidence = 0.5; // Default mid-confidence
    
    if (type === 'source') {
      // Domain-based classification gets higher confidence  
      confidence = 0.8;
    } else if (type === 'content') {
      // Content analysis gets moderate confidence
      confidence = 0.6;
    } else if (type === 'tag') {
      // Tag generation gets lower confidence as it's heuristic
      confidence = 0.5;
    } else if (type === 'entity') {
      // Entity association gets high confidence when there are matches
      confidence = 0.7;
    }
    
    return confidence;
  }
}
