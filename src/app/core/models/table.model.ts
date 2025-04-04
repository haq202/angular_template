import { TemplateRef } from '@angular/core';

export interface IColumnsDefinition {
  field: string;
  header: string;
  sortable?: boolean;
  filter?: boolean;
  customTemplate?: TemplateRef<unknown>;
  minWidth: string;
  maxWidth: string;
  width?: string;
  thColSpan: number;
  tdColSpan: number;
  thClassName?: string;
  thRowSpan?: number;
  [key: string]: unknown;
}

export type headerTableType = 'default' | 'custom';

export type bodyTableType = headerTableType;
