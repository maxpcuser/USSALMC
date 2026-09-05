import { Injectable } from '@nestjs/common';

@Injectable()
export class RankingService {
  rankResults(results: any[], rankingType: string = 'score') {
    switch (rankingType) {
      case 'relevance':
        return this.rankByRelevance(results);
      case 'date':
        return this.rankByDate(results);
      case 'popularity':
        return this.rankByPopularity(results);
      default:
        return results.sort((a, b) => b.score - a.score);
    }
  }

  private rankByRelevance(results: any[]) {
    return results.sort((a, b) => b.score - a.score);
  }

  private rankByDate(results: any[]) {
    return results.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date || 0).getTime();
      const dateB = new Date(b.createdAt || b.date || 0).getTime();
      return dateB - dateA;
    });
  }

  private rankByPopularity(results: any[]) {
    return results.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
  }

  // Advanced ranking with custom weights
  rankWithWeights(
    results: any[],
    weights: { [key: string]: number } = {},
  ): any[] {
    return results.map((result) => {
      let score = result.score || 0;
      
      // Apply weighted ranking factors
      if (weights.relevance !== undefined) {
        score *= weights.relevance;
      }
      
      if (weights.date !== undefined && result.createdAt) {
        const dateScore = this.calculateDateScore(result.createdAt);
        score += dateScore * weights.date;
      }
      
      if (weights.popularity !== undefined && result.viewCount) {
        score += result.viewCount * weights.popularity;
      }
      
      return { ...result, weightedScore: score };
    }).sort((a, b) => b.weightedScore - a.weightedScore);
  }

  private calculateDateScore(createdAt: string): number {
    const created = new Date(createdAt);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24),
    );
    
    // Recent content gets higher score
    return Math.max(0, 10 - diffInDays);
  }
}