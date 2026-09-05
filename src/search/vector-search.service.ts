import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class VectorSearchService {
  constructor(private readonly elasticsearchClient: Client) {}

  async search(queryVector: number[], index: string = 'documents') {
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

  async searchWithFilters(
    queryVector: number[],
    filters: any,
    index: string = 'documents',
  ) {
    const filterQuery = this.buildFilters(filters);

    const result = await this.elasticsearchClient.search({
      index,
      body: {
        query: {
          bool: {
            must: [
              {
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
        },
      }
    }

    return {
      bool: {
        must: filterConditions,
      },
    };
  }

  async indexDocument(document: any, id?: string) {
    const result = await this.elasticsearchClient.index({
      index: 'documents',
      id,
      body: document,
    });

    return result.body;
  }
}