
// Shared TypeScript types for USSA Knowledge Core

export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface AuthToken {
  token: string;
  expiresAt: Date;
  refreshToken?: string;
}

export interface SearchQuery {
  query: string;
  filters?: Record<string, any>;
  limit?: number;
  offset?: number;
}

export interface ContextRequest {
  entityId: string;
  includeSources?: boolean;
  includeRelationships?: boolean;
}
