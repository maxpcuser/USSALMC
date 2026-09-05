import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchStatisticsService {
  private searchHistory: any[] = [];
  private queryFrequency: Map<string, number> = new Map();
  private searchMetrics: any = {
    totalSearches: 0,
    avgResponseTime: 0,
    mostSearchedTerms: [],
  };

  recordSearch(
    query: string,
    results: any[],
    responseTime: number,
    userId?: string,
  ) {
    const searchRecord = {
      timestamp: new Date().toISOString(),
      query,
      resultCount: results.length,
      responseTime,
      userId,
      searchId: this.generateSearchId(),
    };

    this.searchHistory.push(searchRecord);
    this.updateQueryFrequency(query);
    this.calculateMetrics();
  }

  private updateQueryFrequency(query: string) {
    const normalizedQuery = query.toLowerCase().trim();
    const currentCount = this.queryFrequency.get(normalizedQuery) || 0;
    this.queryFrequency.set(normalizedQuery, currentCount + 1);
  }

  private calculateMetrics() {
    this.searchMetrics.totalSearches = this.searchHistory.length;
    
    if (this.searchHistory.length > 0) {
      const totalResponseTime = this.searchHistory.reduce(
        (sum, record) => sum + record.responseTime,
        0,
      );
      this.searchMetrics.avgResponseTime = 
        totalResponseTime / this.searchHistory.length;
      
      // Get most searched terms
      const sortedTerms = Array.from(this.queryFrequency.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(entry => entry[0]);
      
      this.searchMetrics.mostSearchedTerms = sortedTerms;
    }
  }

  private generateSearchId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  getSearchMetrics(): any {
    return this.searchMetrics;
  }

  getRecentSearches(limit: number = 20): any[] {
    return this.searchHistory.slice(-limit);
  }

  getPopularQueries(limit: number = 10): string[] {
    const sortedTerms = Array.from(this.queryFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(entry => entry[0]);
    
    return sortedTerms;
  }

  getSearchTrends(timeRange: number = 24): any {
    const now = new Date();
    const timeThreshold = new Date(now.getTime() - timeRange * 60 * 60 * 1000);
    
    const filteredSearches = this.searchHistory.filter(
      record => new Date(record.timestamp) > timeThreshold,
    );
    
    return {
      searchCount: filteredSearches.length,
      averageResults: 
        filteredSearches.reduce((sum, record) => sum + record.resultCount, 0) /
        Math.max(filteredSearches.length, 1),
      peakHour: this.getPeakSearchHour(filteredSearches),
    };
  }

  private getPeakSearchHour(searches: any[]): number {
    const hourCounts = {};
    
    searches.forEach(record => {
      const hour = new Date(record.timestamp).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    
    return Object.entries(hourCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 0;
  }

  resetSearchHistory() {
    this.searchHistory = [];
    this.queryFrequency.clear();
    this.searchMetrics = {
      totalSearches: 0,
      avgResponseTime: 0,
      mostSearchedTerms: [],
    };
  }
}