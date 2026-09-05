// Template DTOs
import { IsString, IsOptional, IsBoolean, IsNumber, IsEnum } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  sourceId?: number;

  @IsNumber()
  entityTypeId: number;

  @IsString()
  sourceDomain: string;

  @IsEnum(['draft', 'testing', 'approved', 'deprecated', 'disabled'])
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateTemplateDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  sourceId?: number;

  @IsNumber()
  @IsOptional()
  entityTypeId?: number;

  @IsString()
  @IsOptional()
  sourceDomain?: string;

  @IsEnum(['draft', 'testing', 'approved', 'deprecated', 'disabled'])
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CreateTemplateVersionDto {
  @IsNumber()
  templateId: number;

  @IsNumber()
  versionNumber: number;

  @IsString()
  @IsOptional()
  changeSummary?: string;

  @IsString()
  @IsOptional()
  selectorStrategy?: string;

  @IsOptional()
  configuration?: any;
}

export class CreateTemplateFieldDto {
  @IsNumber()
  templateVersionId: number;

  @IsNumber()
  @IsOptional()
  entityFieldId?: number;

  @IsString()
  fieldName: string;

  @IsString()
  selector: string;

  @IsString()
  @IsOptional()
  selectorType?: string;

  @IsString()
  @IsOptional()
  attributeName?: string;

  @IsBoolean()
  @IsOptional()
  isRequired?: boolean;

  @IsString()
  @IsOptional()
  extractionType?: string;

  @IsString()
  @IsOptional()
  defaultValue?: string;

  @IsOptional()
  fieldConfiguration?: any;
}

export class CreateTemplateTestDto {
  @IsNumber()
  templateVersionId: number;

  @IsString()
  testUrl: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsOptional()
  result?: any;
}