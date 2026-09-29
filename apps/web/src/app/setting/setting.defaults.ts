import { Parameter } from 'app/models/parameter.model';
import { ConsoleSetting, ReportStyle } from 'app/models/setting.model';
import { ProjectCurrency } from 'app/models/project.model';

// same defaults the server uses when it creates the settings of an area, the settings
// of an older area can arrive without some of these properties
export const DEFAULT_PARAMETERS: Parameter[] = [
  { key: 'A', label: 'MATERIALES', formula: '*', ratio: 0, is_total: false },
  { key: 'B', label: 'MANO DE OBRA', formula: '*', ratio: 0, is_total: false },
  { key: 'C', label: 'EQUIPO, MAQUINARIA Y HERRAMIENTAS', formula: '*', ratio: 0, is_total: false },
  { key: 'D', label: 'TOTAL MATERIALES', formula: 'A', ratio: 0, is_total: true },
  { key: 'E', label: 'MANO DE OBRA INDIRECTA', formula: 'B', ratio: 0, is_total: false },
  { key: 'F', label: 'CARGAS SOCIALES', formula: 'B', ratio: 55, is_total: false },
  { key: 'G', label: 'TOTAL MANO DE OBRA', formula: 'B+E+F', ratio: 0, is_total: true },
  { key: 'H', label: 'HERRAMIENTAS MENORES', formula: 'B', ratio: 5, is_total: false },
  { key: 'I', label: 'TOTAL HERRAMIENTAS', formula: 'C+H', ratio: 0, is_total: true },
  { key: 'J', label: 'SUB TOTAL', formula: 'D+G+I', ratio: 0, is_total: true },
  { key: 'K', label: 'INPREVISTOS', formula: 'J', ratio: 0, is_total: false },
  { key: 'L', label: 'GASTOS GENERALES', formula: 'J', ratio: 5, is_total: false },
  { key: 'M', label: 'UTILIDAD', formula: 'J', ratio: 5, is_total: false },
  { key: 'N', label: 'PARCIAL', formula: 'J+K+L+M', ratio: 0, is_total: true },
  { key: 'O', label: 'IMPUESTOS IVA', formula: 'N', ratio: 14.94, is_total: false },
  { key: 'P', label: 'IMPUESTOS IT', formula: 'N', ratio: 3.9, is_total: false },
  { key: 'Q', label: 'N/A', formula: 'N', ratio: 0, is_total: false },
  { key: 'T', label: 'TOTAL ITEM', formula: 'N+O+P', ratio: 0, is_total: true },
];

export const DEFAULT_CURRENCY: Required<ProjectCurrency> = {
  international: 'USD',
  local: 'BOB',
};

export const DEFAULT_CURRENCY_VALUE = 6.96;

export const DEFAULT_REPORT_STYLE: ReportStyle = {
  color: '#1a1a1a',
  font_size: 12,
  font_family: 'Arial, Helvetica, sans-serif',
  table_header_color: '#e6e6e6',
  modules_color: '#d9d9d9',
  total_color: '#bfbfbf',
};

export const DEFAULT_ROUND = 2;

// fills with the defaults every property of the setting that arrived undefined
export const apply_setting_defaults = (setting: Partial<ConsoleSetting>) => {
  if (!setting) {
    throw new Error('setting is undefined');
  }

  return {
    parameters: setting.parameters ?? DEFAULT_PARAMETERS,
    currency: { ...DEFAULT_CURRENCY, ...setting.currency },
    currency_value: setting.currency_value || DEFAULT_CURRENCY_VALUE,
    report_style: { ...DEFAULT_REPORT_STYLE, ...setting.report_style },
    round: setting.round ?? DEFAULT_ROUND,
  };
};
