import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class SearchService {
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

  async indexDocument(document: any, id?: string) {
    const result = await this.elasticsearchClient.index({
      index: 'documents',
      id,
      body: document,
    });

    return result.body;
  }

  async deleteDocument(id: string) {
    const result = await this.elasticsearchClient.delete({
      index: 'documents',
      id,
    });

    return result.body;
  }
}