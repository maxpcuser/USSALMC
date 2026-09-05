import { Injectable } from '@nestjs/common';

@Injectable()
export class FilterService {
  applyFilters(results: any[], filters: any = {}) {
    return results.filter((result) => {
      // Apply each filter
      for (const [key, value] of Object.entries(filters)) {
        if (Array.isArray(value)) {
          // Array filter - check if the result property is in the filter array
          if (!value.includes(result[key])) {
            return false;
          }
        } else if (typeof value === 'object' && value !== null) {
          // Range filter or other object types
          if (value.min !== undefined && result[key] < value.min) {
            return false;
          }
          if (value.max !== undefined && result[key] > value.max) {
            return false;
          }
        } else {
          // Direct match filter
          if (result[key] !== value) {
            return false;
          }
        }
      }
      return true;
    });
  }

  buildFilterQuery(filters: any = {}) {
    const filterConditions = [];

    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value)) {
        // Array filter - apply terms query
        filterConditions.push({
          terms: {
            [key]: value,
          },
        });
      } else if (typeof value === 'object' && value !== null) {
        // Range filter or other object types
        if (value.min !== undefined || value.max !== undefined) {
          filterConditions.push({
            range: {
              [key]: value,
            },
          });
        }
      } else {
        // Direct match filter
        filterConditions.push({
          term: {
            [key]: value,
          },
        });
      }
    }

    return filterConditions;
  }

  validateFilters(filters: any, allowedFilters: string[] = []) {
    const validFilters = {};
    for (const [key, value] of Object.entries(filters)) {
      if (allowedFilters.includes(key)) {
        validFilters[key] = value;
      }
    }
    return validFilters;
  }
}