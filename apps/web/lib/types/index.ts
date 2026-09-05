export interface Source {
  id: number;
  name: string;
  description?: string;
  domain?: string;
  baseUrl?: string;
  sourceType?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  metadata?: any;
}

export interface EntityType {
  id: number;
  name: string;
  displayName?: string;
  description?: string;
  icon?: string;
  isSystem: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  entityFields?: EntityField[];
}

export interface EntityField {
  id: number;
  entityTypeId: number;
  name: string;
  displayName?: string;
  fieldType: string;
  isRequired: boolean;
  isSearchable: boolean;
  isFilterable: boolean;
  defaultValue?: string;
  fieldConfig?: any;
  createdAt: string;
  updatedAt: string;
}

export interface Entity {
  id: number;
  entityTypeId: number;
  name: string;
  slug: string;
  status: string;
  data?: any;
  metadata?: any;
  sourceId?: number;
  createdAt: string;
  updatedAt: string;
  entityVersions?: EntityVersion[];
}

export interface EntityVersion {
  id: number;
  entityId: number;
  versionNumber: number;
  changeReason?: string;
  data?: any;
  createdAt: string;
}

export interface RelationshipType {
  id: number;
  name: string;
  displayName?: string;
  sourceEntityTypeId: number;
  targetEntityTypeId: number;
  cardinality?: string;
  createdAt: string;
  sourceEntityType?: EntityType;
  targetEntityType?: EntityType;
}

export interface Relationship {
  id: number;
  relationshipTypeId: number;
  sourceEntityId: number;
  targetEntityId: number;
  metadata?: any;
  createdAt: string;
  relationshipType?: RelationshipType;
  sourceEntity?: Entity;
  targetEntity?: Entity;
}

export interface ApplicationSetting {
  id: number;
  key: string;
  value?: string;
  category?: string;
  updatedAt: string;
}

export interface AuditEvent {
  id: number;
  eventType: string;
  entityType?: string;
  entityId?: number;
  details?: any;
  createdAt: string;
}