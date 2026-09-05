import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryAnalysisService {
  analyzeQuery(query: string): any {
    const analysis = {
      originalQuery: query,
      terms: this.extractTerms(query),
      hasOperators: this.hasLogicalOperators(query),
      queryType: this.identifyQueryType(query),
      isBooleanSearch: this.isBooleanSearch(query),
      keywords: this.extractKeywords(query),
      filters: this.extractFilters(query),
      sentiment: this.analyzeSentiment(query),
    };

    return analysis;
  }

  private extractTerms(query: string): string[] {
    // Simple term extraction - split by whitespace and remove common words
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    return query
      .toLowerCase()
      .split(/\s+/)
      .filter(term => term.length > 2 && !stopWords.includes(term));
  }

  private hasLogicalOperators(query: string): boolean {
    const operators = ['AND', 'OR', 'NOT', '&&', '||', '!'];
    return operators.some(op => query.toUpperCase().includes(op));
  }

  private identifyQueryType(query: string): string {
    if (query.includes('"') || query.includes("'")) {
      return 'phrase';
    } else if (this.hasLogicalOperators(query)) {
      return 'boolean';
    } else if (query.length < 10) {
      return 'short';
    } else {
      return 'fulltext';
    }
  }

  private isBooleanSearch(query: string): boolean {
    // Check if query contains boolean operators
    const booleanPattern = /\b(AND|OR|NOT|&&|\|\||!)\b/i;
    return booleanPattern.test(query);
  }

  private extractKeywords(query: string): string[] {
    // Extract keywords that are likely to be significant for search
    const terms = this.extractTerms(query);
    
    // Filter out very common words (this is a simplified approach)
    const commonWords = ['search', 'find', 'look', 'type', 'content', 'document'];
    return terms.filter(term => !commonWords.includes(term));
  }

  private extractFilters(query: string): any {
    // Extract filters that might be present in the query
    const filters = {};
    
    // Look for date filters (simplified)
    const datePattern = /(\d{4})-(\d{2})-(\d{2})/g;
    const dates = query.match(datePattern);
    if (dates && dates.length > 0) {
      filters['date'] = dates[0];
    }
    
    // Look for category or type filters
    const typePattern = /category:(\w+)/i;
    const categoryMatch = query.match(typePattern);
    if (categoryMatch && categoryMatch[1]) {
      filters['category'] = categoryMatch[1];
    }
    
    return filters;
  }

  private analyzeSentiment(query: string): string {
    // Simple sentiment analysis
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'disappointing'];
    
    const queryLower = query.toLowerCase();
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      if (queryLower.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
      if (queryLower.includes(word)) negativeCount++;
    });
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  enhanceQuery(originalQuery: string, analysis: any): string {
    let enhancedQuery = originalQuery;
    
    // Add keywords as synonyms if they are missing
    if (analysis.keywords.length > 0 && !originalQuery.includes('AND') && !originalQuery.includes('OR')) {
      const keywordPhrase = analysis.keywords.join(' ');
      if (!originalQuery.toLowerCase().includes(keywordPhrase)) {
        enhancedQuery = `${enhancedQuery} OR ${keywordPhrase}`;
      }
    }
    
    // Add filters based on analysis
    if (analysis.filters.category) {
      enhancedQuery = `${enhancedQuery} category:${analysis.filters.category}`;
    }
    
    return enhancedQuery;
  }

  normalizeQuery(query: string): string {
    // Normalize the query for consistent matching
    return query
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s\-':"]/g, '');
  }
}