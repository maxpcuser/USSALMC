import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { SearchService } from './search.service';
import { KeywordSearchService } from './keyword-search.service';
import { VectorSearchService } from './vector-search.service';
import { HybridSearchService } from './hybrid-search.service';
import { RankingService } from './ranking.service';
import { FilterService } from './filter.service';
import { MetadataSearchService } from './metadata-search.service';
import { RelationshipSearchService } from './relationship-search.service';
import { QueryAnalysisService } from './query-analysis.service';
import { SearchStatisticsService } from './search-statistics.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly keywordSearchService: KeywordSearchService,
    private readonly vectorSearchService: VectorSearchService,
    private readonly hybridSearchService: HybridSearchService,
    private readonly rankingService: RankingService,
    private readonly filterService: FilterService,
    private readonly metadataSearchService: MetadataSearchService,
    private readonly relationshipSearchService: RelationshipSearchService,
    private readonly queryAnalysisService: QueryAnalysisService,
    private readonly searchStatisticsService: SearchStatisticsService,
  ) {}

  @Get('keyword')
  async keywordSearch(
    @Query('q') query: string,
    @Query('index') index: string = 'documents',
  ) {
    const result = await this.keywordSearchService.search(query, index);
    return this.rankingService.rankResults(result);
  }

  @Get('vector')
  async vectorSearch(
    @Query('vector') vector: string,
    @Query('index') index: string = 'documents',
  ) {
    const vectorArray = JSON.parse(vector);
    const result = await this.vectorSearchService.search(vectorArray, index);
    return this.rankingService.rankResults(result);
  }

  @Get('hybrid')
  async hybridSearch(
    @Query('q') query: string,
    @Query('vector') vector: string,
    @Query('index') index: string = 'documents',
    @Query('keywordWeight') keywordWeight: number = 0.5,
    @Query('vectorWeight') vectorWeight: number = 0.5,
  ) {
    const vectorArray = JSON.parse(vector);
    const result = await this.hybridSearchService.search(
      query,
      vectorArray,
      index,
      keywordWeight,
      vectorWeight,
    );
    return this.rankingService.rankResults(result);
  }

  @Post('advanced')
  async advancedSearch(
    @Body() searchParams: any,
  ) {
    const { 
      query, 
      vector, 
      filters, 
      sort,
      page = 1, 
      limit = 20 
    } = searchParams;

    let result;
    
    if (vector && vector.length > 0) {
      // Use vector search
      result = await this.vectorSearchService.searchWithFilters(
        vector,
        filters
      );
    } else if (query) {
      // Use keyword search
      result = await this.keywordSearchService.advancedSearch(
        filters,
        query,
      );
    } else {
      // Fallback to basic search with filters
      const searchResult = await this.searchService.search(query || '', 'documents');
      result = this.filterService.applyFilters(searchResult, filters);
    }

    return this.rankingService.rankResults(result, sort);
  }

  @Get('analyze')
  analyzeQuery(@Query('q') query: string) {
    return this.queryAnalysisService.analyzeQuery(query);
  }
}