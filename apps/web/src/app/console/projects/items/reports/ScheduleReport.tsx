import React from 'react';
import moment from 'moment';

import { ReportPage } from './ReportPage';

import './Reports.scss';
import { ReportInfoHeader } from './ReportInfoHeader';
import { get_active_modules, export_tables_to_excel } from './report_utils';
import { Project, ProjectModule, ProjectConstruction } from 'app/models/project.model';

const WORKING_DAYS = [1, 2, 3, 4, 5]; // Mon–Fri (0=Sun, 6=Sat)
const DAY_LABELS = ['L', 'M', 'M', 'J', 'V'];

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

/**
 * Returns an array of Date objects for every working day (Mon–Fri)
 * between start_date (inclusive) and end_date (inclusive).
 */
const get_working_days_between = (start_date: any, end_date: any): Date[] => {
  if (!start_date || !end_date) return [];
  const days: Date[] = [];
  const cursor = new Date(start_date);
  cursor.setHours(0, 0, 0, 0);
  const end = new Date(end_date);
  end.setHours(23, 59, 59, 999);

  while (cursor <= end) {
    if (WORKING_DAYS.includes(cursor.getDay())) {
      days.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
};

/**
 * Groups an ordered list of working days into month spans: [{ label, count }].
 */
interface MonthGroup {
  key: string;
  label: string;
  count: number;
}

const build_month_header = (working_days: Date[]) => {
  const months: MonthGroup[] = [];
  let cur_month: MonthGroup | null = null;

  working_days.forEach((day) => {
    const month_key = `${day.getFullYear()}-${day.getMonth()}`;
    const month_label = `${MONTH_NAMES[day.getMonth()]} ${day.getFullYear()}`;

    if (!cur_month || cur_month.key !== month_key) {
      cur_month = { key: month_key, label: month_label, count: 1 };
      months.push(cur_month);
    } else {
      cur_month.count++;
    }
  });

  return months;
};

/**
 * Resolves the working-day range for a module: prefers the module's own
 * start/end date, falling back to the span of its constructions' dates.
 */
const resolve_module_range = (module: ProjectModule) => {
  if (!module) {
    throw new Error('module is undefined');
  }

  const constructions = module.constructions || [];
  const dated = constructions.filter((c) => c.start_date && c.end_date);

  let range_start = module.start_date ? new Date(module.start_date) : null;
  let range_end = module.end_date ? new Date(module.end_date) : null;

  if (!range_start && dated.length) {
    range_start = new Date(Math.min(...dated.map((c) => new Date(c.start_date as string).getTime())));
  }
  if (!range_end && dated.length) {
    range_end = new Date(Math.max(...dated.map((c) => new Date(c.end_date as string).getTime())));
  }

  return { range_start, range_end };
};

interface ScheduleReportBarProps {
  construction: ProjectConstruction;
  working_days: Date[];
}

const ScheduleReportBar = ({ construction, working_days }: ScheduleReportBarProps) => {
  if (!construction) {
    throw new Error('construction is undefined');
  }
  if (!working_days) {
    throw new Error('working_days is undefined');
  }

  if (!construction.start_date || !construction.end_date) {
    return working_days.map((day, i) => <td key={i} className="schedule-report__cell" />);
  }

  const item_start = new Date(construction.start_date);
  item_start.setHours(0, 0, 0, 0);
  const item_end = new Date(construction.end_date);
  item_end.setHours(23, 59, 59, 999);

  return working_days.map((day, i) => {
    const d = new Date(day);
    d.setHours(12, 0, 0, 0);
    const is_active = d >= item_start && d <= item_end;

    return (
      <td
        key={i}
        className={[
          'schedule-report__cell',
          is_active ? 'schedule-report__cell--active' : '',
          is_active && construction.is_critical ? 'schedule-report__cell--critical' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        data-excel-value={is_active ? (construction.is_critical ? 'X*' : 'X') : ''}
      />
    );
  });
};

interface ScheduleReportModuleProps {
  module: ProjectModule;
}

const ScheduleReportModule = ({ module }: ScheduleReportModuleProps) => {
  if (!module) {
    throw new Error('module is undefined');
  }

  const constructions = module.constructions || [];
  const { range_start, range_end } = resolve_module_range(module);
  const working_days = get_working_days_between(range_start, range_end);
  const months = build_month_header(working_days);

  return (
    <div className="schedule-report__module">
      <div className="section-title">{module.name}</div>
      {working_days.length === 0 ? (
        <p className="schedule-report__empty">Sin fechas de cronograma definidas.</p>
      ) : (
        <table className="schedule-report__grid">
          <thead>
            <tr>
              <th className="schedule-report__name-col" rowSpan={2}>Ítem</th>
              {months.map((m, i) => (
                <th key={i} colSpan={m.count}>{m.label}</th>
              ))}
            </tr>
            <tr>
              {working_days.map((day, i) => (
                <th key={i} className="schedule-report__day-header">
                  {DAY_LABELS[WORKING_DAYS.indexOf(day.getDay())]}
                  <span className="schedule-report__day-num">{day.getDate()}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {constructions.map((construction) => (
              <tr key={construction._id}>
                <td className="schedule-report__name-col">{construction.name}</td>
                <ScheduleReportBar construction={construction} working_days={working_days} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const export_schedule_report_to_excel = (project: Project) => {
  if (!project) {
    throw new Error('project is undefined');
  }

  const info_table = document.querySelector('.schedule-report .info-table table');
  const content_tables = Array.from(document.querySelectorAll('.schedule-report .content-table table'));

  if (content_tables.length === 0) {
    throw new Error('table is undefined');
  }

  const tables = [info_table, ...content_tables].filter(Boolean);

  export_tables_to_excel(tables, `cronograma_de_ejecucion_${project.name || 'proyecto'}.xls`);
};

interface ScheduleReportProps {
  project: Project;
}

const ScheduleReport = ({ project }: ScheduleReportProps) => {
  if (!project) {
    throw new Error('project is undefined');
  }

  const active_modules = get_active_modules(project);

  return (
    <ReportPage class_name="schedule-report">
      <ReportPage.InfoTable>
        <ReportInfoHeader title="CRONOGRAMA DE EJECUCIÓN" project={project} />
      </ReportPage.InfoTable>

      <ReportPage.ContentTable>
        {active_modules.map((module) => (
          <ScheduleReportModule key={module._id} module={module} />
        ))}
      </ReportPage.ContentTable>
    </ReportPage>
  );
};

export { ScheduleReport, export_schedule_report_to_excel };
