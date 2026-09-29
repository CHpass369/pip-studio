import { Measure } from 'app/models/measure.model';
import { Project, ProjectModule } from 'app/models/project.model';
const escape_html = (parameters: any) => {
  if (parameters == null) {
    return '';
  }

  return String(parameters)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

const read_table_rows = (table: any) => {
  if (!table) {
    throw new Error('table is undefined');
  }

  return Array.from(table.rows).map((row) => Array.from(row.cells).map((cell) => ({
    value: cell.dataset.excelValue ?? cell.textContent.trim(),
    align: cell.classList.contains('text-right') ? 'right' : 'left',
  })));
};

const export_tables_to_excel = (tables: any, filename: any) => {
  if (!tables || tables.length === 0) {
    throw new Error('tables is undefined');
  }
  if (!filename) {
    throw new Error('filename is undefined');
  }

  const rows = tables.flatMap((table, index) => (index === 0 ? read_table_rows(table) : [[], ...read_table_rows(table)]));

  const rows_html = rows.map((cells) => {
    const cells_html = cells.map((cell) => `<td align="${cell.align}">${escape_html(cell.value)}</td>`).join('');
    return `<tr>${cells_html}</tr>`;
  }).join('');

  const html = `
    <html>
      <head><meta charset="UTF-8" /></head>
      <body>
        <table border="1">${rows_html}</table>
      </body>
    </html>
  `;

  const blob = new Blob(['﻿', html], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const ACCENTED_CHARACTERS = { a: 'áàä', e: 'éèë', i: 'íìï', o: 'óòö', u: 'úùü', n: 'ñ' };

const strip_accents = (text: any) => Object.entries(ACCENTED_CHARACTERS).reduce(
  (acc, [plain, accented]) => Array.from(accented).reduce((inner_acc, character) => inner_acc.split(character).join(plain), acc),
  text,
);

const slugify = (text: any) => {
  if (text == null) {
    return '';
  }

  return strip_accents(String(text).toLowerCase())
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
};

const format_number = (value: any, round: any = 2) => {
  if (value == null || isNaN(value)) {
    return (0).toFixed(round);
  }

  return value.toLocaleString('en-US', {
    minimumFractionDigits: round,
    maximumFractionDigits: round,
  });
};

const get_measure = (measure_id: string | null | undefined, measures: Measure[]) => {
  if (!measures) {
    throw new Error('measures is undefined');
  }

  const measure = measures.find((measure) => measure._id === measure_id);

  if (!measure) {
    return '';
  }

  return measure.abbreviation;
};

const get_active_modules = (project: Project): ProjectModule[] => {
  if (!project) {
    throw new Error('project is undefined');
  }

  return project.modules.filter((module) => module.is_active);
};

export {
  format_number, get_measure, get_active_modules, export_tables_to_excel, slugify,
};
