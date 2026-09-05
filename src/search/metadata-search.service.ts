import { Injectable } from '@nestjs/common';

@Injectable()
export class MetadataSearchService {
  searchByMetadata(metadataFilters: any, results: any[]) {
    return results.filter((result) => {
      // Check if all metadata filters match
      for (const [key, value] of Object.entries(metadataFilters)) {
        if (!this.matchesFilter(result.metadata || {}, key, value)) {
          return false;
        }
      }
      return true;
    });
  }

  private matchesFilter(metadata: any, key: string, filterValue: any) {
    const metadataValue = metadata[key];
    
    if (Array.isArray(filterValue)) {
      // Multiple values - check if any match
      return filterValue.some((value) => this.valueMatches(metadataValue, value));
    } else {
      // Single value
      return this.valueMatches(metadataValue, filterValue);
    }
  }

  private valueMatches(metadataValue: any, filterValue: any): boolean {
    if (metadataValue === undefined || metadataValue === null) {
      return false;
    }
    
    if (Array.isArray(metadataValue)) {
      // If metadata value is an array, check if any element matches
      return metadataValue.some((item) => item === filterValue);
    } else {
      // Direct comparison
      return metadataValue === filterValue;
    }
  }

  searchByMetadataFields(fields: string[], results: any[]) {
    return results.map((result) => {
      const filteredMetadata = {};
      
      fields.forEach((field) => {
        if (result.metadata && result.metadata[field] !== undefined) {
          filteredMetadata[field] = result.metadata[field];
        }
      });
      
      return {
        ...result,
        metadata: filteredMetadata,
      };
    });
  }

  buildMetadataFilterQuery(metadataFilters: any = {}) {
    const filterConditions = [];

    for (const [key, value] of Object.entries(metadataFilters)) {
      if (Array.isArray(value)) {
        // Array filter
        filterConditions.push({
          terms: {
            [`metadata.${key}`]: value,
          },
        });
      } else if (typeof value === 'object' && value !== null) {
        // Range or other object filter
        if (value.min !== undefined || value.max !== undefined) {
          filterConditions.push({
            range: {
              [`metadata.${key}`]: value,
            },
          });
        }
      } else {
        // Direct match
        filterConditions.push({
          term: {
            [`metadata.${key}`]: value,
          },
        });
      }
    }

    return filterConditions;
  }
}