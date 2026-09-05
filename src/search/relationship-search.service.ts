import { Injectable } from '@nestjs/common';

@Injectable()
export class RelationshipSearchService {
  searchByRelationships(
    targetId: string,
    relationshipType: string,
    results: any[],
  ) {
    return results.filter((result) => {
      // Check if the result has relationships with the target id
      if (!result.relationships || !Array.isArray(result.relationships)) {
        return false;
      }
      
      return result.relationships.some(
        (rel) =>
          rel.targetId === targetId && 
          (relationshipType ? rel.type === relationshipType : true),
      );
    });
  }

  searchByMultipleRelationships(
    targetIds: string[],
    relationshipType: string,
    results: any[],
  ) {
    return results.filter((result) => {
      if (!result.relationships || !Array.isArray(result.relationships)) {
        return false;
      }
      
      return result.relationships.some(
        (rel) =>
          targetIds.includes(rel.targetId) && 
          (relationshipType ? rel.type === relationshipType : true),
      );
    });
  }

  searchByRelationshipsAndFilters(
    targetId: string,
    relationshipType: string,
    filters: any,
    results: any[],
  ) {
    return results
      .filter((result) => {
        // Check if the result has relationships with the target id
        if (!result.relationships || !Array.isArray(result.relationships)) {
          return false;
        }
        
        return result.relationships.some(
          (rel) =>
            rel.targetId === targetId && 
            (relationshipType ? rel.type === relationshipType : true),
        );
      })
      .filter((result) => {
        // Apply additional filters
        for (const [key, value] of Object.entries(filters)) {
          if (result[key] !== value) {
            return false;
          }
        }
        return true;
      });
  }

  buildRelationshipFilterQuery(
    targetId: string,
    relationshipType: string,
  ) {
    return {
      bool: {
        must: [
          {
            term: {
              'relationships.targetId': targetId,
            },
          },
          ...(relationshipType ? [{
            term: {
              'relationships.type': relationshipType,
            }
          }] : []),
        ],
      },
    };
  }

  getRelatedDocuments(
    documentId: string, 
    results: any[], 
    maxResults: number = 10
  ) {
    const relatedDocs = [];
    
    for (const result of results) {
      if (result.id === documentId) continue;
      
      // Check for relationships with the document
      if (result.relationships && Array.isArray(result.relationships)) {
        const relatedToThis = result.relationships.some(
          rel => rel.targetId === documentId
        );
        
        if (relatedToThis) {
          relatedDocs.push({
            ...result,
            relevance: this.calculateRelevance(documentId, result)
          });
          
          if (relatedDocs.length >= maxResults) break;
        }
      }
    }
    
    // Sort by relevance and return
    return relatedDocs.sort((a, b) => b.relevance - a.relevance);
  }

  private calculateRelevance(sourceId: string, targetDoc: any): number {
    if (!targetDoc.relationships || !Array.isArray(targetDoc.relationships)) {
      return 0;
    }
    
    const relationship = targetDoc.relationships.find(rel => rel.targetId === sourceId);
    return relationship ? (relationship.weight || 1) : 0;
  }

  addRelationship(documentId: string, targetId: string, type: string, weight: number = 1) {
    // This would typically be implemented to update the document with a new relationship
    return {
      sourceId: documentId,
      targetId,
      type,
      weight,
      timestamp: new Date().toISOString(),
    };
  }
}