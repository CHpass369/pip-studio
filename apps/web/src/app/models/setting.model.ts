import { Setting } from 'administrator/features/settings/models/setting.model';

import { Parameter } from './parameter.model';
import { ProjectCurrency } from './project.model';

export interface ReportStyle {
  color: string;
  font_size: number;
  font_family: string;
  table_header_color: string;
  modules_color: string;
  total_color: string;
}

// the area settings plus the fields the console keeps in them
export interface ConsoleSetting extends Setting {
  parameters?: Parameter[];
  currency?: ProjectCurrency;
  currency_value?: number;
  round?: number;
  report_style?: Partial<ReportStyle>;
}
