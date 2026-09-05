// Template API types
export interface ExtractionTemplate {
  id: number;
  name: string;
  description?: string;
  sourceId?: number;
  entityTypeId: number;
  sourceDomain: string;
  status: 'draft' | 'testing' | 'approved' | 'deprecated' | 'disabled';
  isActive: boolean;
  currentVersionId?: number;
  createdAt: string;
  updatedAt: string;
  source?: Source;
  entityType?: EntityType;
  templateVersions?: TemplateVersion[];
  templateTests?: TemplateTest[];
  templateStatistics?: TemplateStatistic;
}

export interface TemplateVersion {
  id: number;
  templateId: number;
  versionNumber: number;
  changeSummary?: string;
  selectorStrategy?: string;
  configuration?: any;
  createdAt: string;
  extractionTemplate?: ExtractionTemplate;
  templateFields?: TemplateField[];
  templateTests?: TemplateTest[];
}

export interface TemplateField {
  id: number;
  templateVersionId: number;
  entityFieldId?: number;
  fieldName: string;
  selector: string;
  selectorType?: string;
  attributeName?: string;
  isRequired: boolean;
  extractionType: 'text' | 'html' | 'attribute' | 'number' | 'date';
  defaultValue?: string;
  fieldConfiguration?: any;
  createdAt: string;
  templateVersion?: TemplateVersion;
  entityField?: EntityField;
}

export interface TemplateTest {
  id: number;
  templateVersionId: number;
  testUrl: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  executedAt?: string;
  templateVersion?: TemplateVersion;
}

export interface TemplateStatistic {
  id: number;
  templateId: number;
  successfulExtractions: number;
  failedExtractions: number;
  successRate: number;
  confidenceScore: number;
  lastExecutionAt?: string;
  extractionTemplate?: ExtractionTemplate;
}