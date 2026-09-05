import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class KeywordSearchService {
  constructor(private readonly elasticsearchClient: Client) {}

  async search(query: string, index: string = 'documents') {
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
        highlight: {
          fields: {
            title: {},
            content: {},
          },
        },
      },
    });

    return result.body.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
      score: hit._score,
      highlights: hit.highlight,
    }));
  }

  async advancedSearch(filters: any, query: string, index: string = 'documents') {
    const filterQuery = this.buildFilters(filters);
    
    const result = await this.elasticsearchClient.search({
      index,
      body: {
        query: {
          bool: {
            must: [
              {
                multi_match: {
                  query,
                  type: 'best_fields',
                  fields: ['title', 'content', 'tags'],
                  tie_breaker: 0.3,
                },
              },
              filterQuery,
            ],
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

  private buildFilters(filters: any) {
    const filterConditions = [];

    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value)) {
        filterConditions.push({
          terms: {
            [key]: value,
          },
        });
      } else if (typeof value === 'object' && value !== null) {
        // Handle range queries or other nested filters
        filterConditions.push({
          range: {
            [key]: value,
          },
        });
      } else {
        filterConditions.push({
          term: {
            [key]: value,
          },
        });
      }
    }

    return {
      bool: {
        must: filterConditions,
      },
    };
  }
}