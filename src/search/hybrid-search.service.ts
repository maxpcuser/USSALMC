import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class HybridSearchService {
  constructor(private readonly elasticsearchClient: Client) {}

  async search(
    keywordQuery: string,
    vectorQuery: number[],
    index: string = 'documents',
    weightKeyword: number = 0.5,
    weightVector: number = 0.5,
  ) {
    const keywordResult = await this.keywordSearch(keywordQuery, index);
    const vectorResult = await this.vectorSearch(vectorQuery, index);

    // Combine results based on weights
    const combinedResults = this.combineResults(
      keywordResult,
      vectorResult,
      weightKeyword,
      weightVector,
    );

    return combinedResults;
  }

  private async keywordSearch(query: string, index: string) {
    const result = await this.elasticsearchClient.search({
      index,
      body: {
        query: {
          multi_match: {
            query,
            type: 'best_fields',
            fields: ['title', 'content', 'tags'],
            tie_breaker: 0.3,
          },
        },
      },
    });

    return result.body.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
      score: hit._score,
    }));
  }

  private async vectorSearch(queryVector: number[], index: string) {
    const result = await this.elasticsearchClient.search({
      index,
      body: {
        query: {
          script_score: {
            query: {
              match_all: {},
            },
            script: {
              source: "cosineSimilarity(params.queryVector, 'embedding') + 1.0",
              params: {
                queryVector,
              },
            },
          },
        },
      },
    });

    return result.body.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
      score: hit._score,
    }));
  }

  private combineResults(
    keywordResults: any[],
    vectorResults: any[],
    weightKeyword: number,
    weightVector: number,
  ) {
    // Create a map for quick lookup
    const resultMap = new Map();

    // Process keyword results
    keywordResults.forEach((result) => {
      if (resultMap.has(result.id)) {
        resultMap.get(result.id).keywordScore = result.score;
      } else {
        resultMap.set(result.id, {
          ...result,
          keywordScore: result.score,
          vectorScore: 0,
        });
      }
    });

    // Process vector results
    vectorResults.forEach((result) => {
      if (resultMap.has(result.id)) {
        resultMap.get(result.id).vectorScore = result.score;
      } else {
        resultMap.set(result.id, {
          ...result,
          keywordScore: 0,
          vectorScore: result.score,
        });
      }
    });

    // Calculate combined scores
    const results = Array.from(resultMap.values()).map((result: any) => ({
      ...result,
      combinedScore:
        result.keywordScore * weightKeyword + result.vectorScore * weightVector,
    }));

    // Sort by combined score (descending)
    return results.sort((a, b) => b.combinedScore - a.combinedScore);
  }
}