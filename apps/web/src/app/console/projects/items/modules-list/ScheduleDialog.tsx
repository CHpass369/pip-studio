import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import { ProjectConstruction } from 'app/models/project.model';

import './ScheduleDialog.scss';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const WORKING_DAYS = [1, 2, 3, 4, 5]; // Mon–Fri (moment/JS: 0=Sun, 6=Sat)
const DAY_LABELS = ['L', 'M', 'M', 'J', 'V'];
const HOURS_PER_DAY = 8;

/**
 * Parses a value into a Date. Bare "YYYY-MM-DD" strings (as produced by
 * HTML date inputs and to_date_input) are parsed as a *local* calendar date
 * instead of native Date's UTC interpretation — otherwise negative UTC
 * offsets (e.g. America/La_Paz, UTC-4) roll the date back by a day.
 */
// callers guard against empty values before parsing, so the result is always a Date
const parse_local_date = (value: any): Date => {
  if (!value) return null as unknown as Date;
  if (value instanceof Date) return new Date(value.getTime());
  if (typeof value === 'string') {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
      const [, y, m, d] = match;
      return new Date(Number(y), Number(m) - 1, Number(d));
    }
  }
  return new Date(value);
};

/**
 * Returns an array of Date objects for every working day (Mon–Fri)
 * between start_date (inclusive) and end_date (inclusive).
 */
const get_working_days_between = (start_date: any, end_date: any): Date[] => {
  if (!start_date || !end_date) return [];
  const days: Date[] = [];
  const cursor = parse_local_date(start_date);
  cursor.setHours(0, 0, 0, 0);
  const end = parse_local_date(end_date);
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
 * Add N working days to a start date, returns the resulting Date.
 */
const add_working_days = (start_date: any, n_days: any) => {
  if (!start_date || !n_days) return null;
  const cursor = parse_local_date(start_date);
  cursor.setHours(0, 0, 0, 0);
  let remaining = n_days - 1; // the start day counts as day 1
  while (remaining > 0) {
    cursor.setDate(cursor.getDate() + 1);
    if (WORKING_DAYS.includes(cursor.getDay())) {
      remaining--;
    }
  }
  return cursor;
};

/**
 * Resolves an item's start date from an anchor date (the module's start
 * date) plus an offset expressed in working days (0 = same day as anchor).
 */
const add_offset_days = (anchor_date: any, offset_days: any) => {
  if (!anchor_date) return null;
  const offset = parseInt(offset_days, 10) || 0;
  if (offset <= 0) {
    const start = parse_local_date(anchor_date);
    start.setHours(0, 0, 0, 0);
    return start;
  }
  return add_working_days(parse_local_date(anchor_date), offset + 1);
};

/**
 * Count working days between two dates (inclusive).
 */
const count_working_days = (start_date: any, end_date: any) => {
  return get_working_days_between(start_date, end_date).length;
};

/**
 * Working-day offset of a date relative to the anchor (0 = the anchor itself).
 */
const offset_from_anchor = (anchor: any, date: any) => Math.max(count_working_days(anchor, date) - 1, 0);

/**
 * Builds a schedule entry ({ offset_days, days, start_date, end_date }) for
 * an item, from its own persisted dates if present. Otherwise it defaults to
 * a 5-day block starting on the module's own start date (offset_days = 0,
 * since it's the same date as the module start).
 */
const build_item_schedule = (item: any, anchor: any) => {
  if (item.start_date && item.end_date) {
    const item_start = parse_local_date(item.start_date);
    const item_end = parse_local_date(item.end_date);
    return {
      offset_days: item.offset_days || offset_from_anchor(anchor, item_start),
      days: count_working_days(item_start, item_end),
      start_date: to_date_input(item_start),
      end_date: to_date_input(item_end),
    };
  }

  const item_start = anchor;
  const item_end = add_working_days(item_start, 5);
  return {
    offset_days: 0,
    days: 5,
    start_date: to_date_input(item_start),
    end_date: to_date_input(item_end),
  };
};

/**
 * Format a Date to YYYY-MM-DD string (for HTML date inputs).
 */
const to_date_input = (date: any) => {
  if (!date) return '';
  const d = parse_local_date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

// ---------------------------------------------------------------------------
// Grid header builder
// ---------------------------------------------------------------------------

interface ItemSchedule {
  offset_days: any;
  days: any;
  start_date: string;
  end_date: string;
}

interface HeaderGroup {
  key: string;
  label: string;
  count: number;
}

/**
 * Builds the grid header structure from an ordered list of working day Dates.
 * Returns { months: [{ label, count }], weeks: [{ label, count }] }
 */
const build_header = (working_days: Date[]) => {
  if (!working_days.length) return { months: [], weeks: [] };

  const months: HeaderGroup[] = [];
  const weeks: HeaderGroup[] = [];

  let cur_month: HeaderGroup | null = null;
  let cur_week: HeaderGroup | null = null;

  working_days.forEach((day) => {
    const month_key = `${day.getFullYear()}-${day.getMonth()}`;
    const month_label = `${MONTH_NAMES[day.getMonth()]} ${day.getFullYear()}`;

    // Get ISO week number (Mon-based)
    const tmp = new Date(day);
    tmp.setHours(0, 0, 0, 0);
    tmp.setDate(tmp.getDate() + 3 - ((tmp.getDay() + 6) % 7));
    const week1 = new Date(tmp.getFullYear(), 0, 4);
    const week_num =
      1 + Math.round(((tmp.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
    const week_key = `${day.getFullYear()}-W${week_num}`;
    const week_label = `Sem ${week_num}`;

    if (!cur_month || cur_month.key !== month_key) {
      cur_month = { key: month_key, label: month_label, count: 1 };
      months.push(cur_month);
    } else {
      cur_month.count++;
    }

    if (!cur_week || cur_week.key !== week_key) {
      cur_week = { key: week_key, label: week_label, count: 1 };
      weeks.push(cur_week);
    } else {
      cur_week.count++;
    }
  });

  return { months, weeks };
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface ItemScheduleBarProps {
  item_schedule: Partial<ItemSchedule>;
  working_days: Date[];
  item: any;
}

const ItemScheduleBar = ({ item_schedule, working_days, item }: ItemScheduleBarProps) => {
  if (!item_schedule) return null;
  if (!item) return null;

  if (!item_schedule.start_date || !item_schedule.end_date) return null;

  const item_start = parse_local_date(item_schedule.start_date);
  item_start.setHours(0, 0, 0, 0);
  const item_end = parse_local_date(item_schedule.end_date);
  item_end.setHours(23, 59, 59, 999);

  const tooltip_content = (
    <div className="schedule-tooltip">
      <div className="schedule-tooltip__name">{item.name}</div>
      {item.description && (
        <div className="schedule-tooltip__description">{item.description}</div>
      )}
      <div className="schedule-tooltip__dates">
        {to_date_input(item_start)} → {to_date_input(item_end)}
      </div>
      <div className="schedule-tooltip__days">
        {item_schedule.days} días · {item_schedule.days * HOURS_PER_DAY}h
      </div>
    </div>
  );

  return (
    <>
      {working_days.map((day, idx) => {
        const d = new Date(day);
        d.setHours(12, 0, 0, 0);
        const is_active = d >= item_start && d <= item_end;
        const is_first =
          is_active &&
          (idx === 0 ||
            (() => {
              const prev = new Date(working_days[idx - 1]);
              prev.setHours(12, 0, 0, 0);
              return prev < item_start;
            })());
        const is_last =
          is_active &&
          (idx === working_days.length - 1 ||
            (() => {
              const next = new Date(working_days[idx + 1]);
              next.setHours(12, 0, 0, 0);
              return next > item_end;
            })());

        if (!is_active) {
          return <td key={idx} className="schedule-grid__cell" />;
        }

        return (
          <Tooltip key={idx} title={tooltip_content} placement="top" arrow>
            <td
              className={[
                'schedule-grid__cell',
                'schedule-grid__cell--active',
                item.is_critical ? 'schedule-grid__cell--critical' : '',
                is_first ? 'schedule-grid__cell--first' : '',
                is_last ? 'schedule-grid__cell--last' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {is_first && (
                <span className="schedule-grid__bar-label">
                  {item_schedule.days}d
                </span>
              )}
            </td>
          </Tooltip>
        );
      })}
    </>
  );
};

// ---------------------------------------------------------------------------
// Main Dialog
// ---------------------------------------------------------------------------

interface ScheduleDialogProps {
  open: boolean;
  on_close: () => void;
  items: ProjectConstruction[];
  module_start_date: any;
  module_end_date: any;
  project_start_date: any;
  project_end_date: any;
  on_module_dates_change: (data: { start_date?: string; end_date?: string }) => void;
  on_item_schedule_change: (construction_id: string, schedule: ItemSchedule) => void;
  on_item_critical_change: (construction_id: string, is_critical: boolean) => void;
}

const ScheduleDialog = ({
  open,
  on_close,
  items,
  module_start_date,
  module_end_date,
  project_start_date,
  project_end_date,
  on_module_dates_change,
  on_item_schedule_change,
  on_item_critical_change,
}: ScheduleDialogProps) => {
  if (!items) {
    throw new Error('items is undefined');
  }

  const today = new Date();
  const default_end = new Date(today);
  default_end.setMonth(default_end.getMonth() + 3);

  // The module owns its own start/end date; the project's dates are only a
  // suggestion used to pre-fill the very first time a module has none yet.
  const suggested_start = module_start_date || project_start_date || today;
  const suggested_end = module_end_date || project_end_date || default_end;

  const [global_start, set_global_start] = useState(() => to_date_input(suggested_start));
  const [global_end, set_global_end] = useState(() => to_date_input(suggested_end));

  // Keep the grid range in sync when the module's own dates change elsewhere.
  useEffect(() => {
    if (module_start_date) {
      set_global_start(to_date_input(module_start_date));
    }
  }, [module_start_date]);

  useEffect(() => {
    if (module_end_date) {
      set_global_end(to_date_input(module_end_date));
    }
  }, [module_end_date]);

  // Map of item._id → { offset_days, days, start_date, end_date }. Items
  // without a persisted schedule default to a 5-day block starting on the
  // module's own start date (offset_days = 0).
  const [schedules, set_schedules] = useState<Record<string, ItemSchedule>>(() => {
    const anchor = parse_local_date(suggested_start);
    const initial: Record<string, ItemSchedule> = {};

    items.forEach((item) => {
      initial[item._id] = build_item_schedule(item, anchor);
    });

    return initial;
  });

  // Fill in a default schedule for any item that doesn't have one yet — e.g.
  // a construction added after the dialog was first opened — defaulting to
  // the module's own start date (offset_days = 0).
  useEffect(() => {
    if (!global_start) return;

    const anchor = parse_local_date(global_start);
    const missing = items.filter((item) => !schedules[item._id]);
    if (!missing.length) return;

    set_schedules((prev) => {
      const next = { ...prev };
      missing.forEach((item) => {
        next[item._id] = build_item_schedule(item, anchor);
      });
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, global_start]);

  // Recalculate every item's "Inicio"/"Fin" from its "Días desde inicio" (offset)
  // whenever the module's own start date changes — the same way "Fin" reacts
  // when "Días" changes, just anchored on the module start instead of the item's.
  const is_first_anchor_render = useRef(true);

  useEffect(() => {
    if (is_first_anchor_render.current) {
      is_first_anchor_render.current = false;
      return;
    }
    if (!global_start) return;

    const anchor = parse_local_date(global_start);
    const next: Record<string, ItemSchedule> = {};
    const changes: (ItemSchedule & { item_id: string })[] = [];

    Object.keys(schedules).forEach((item_id) => {
      const s = schedules[item_id];
      const offset_days = parseInt(s.offset_days, 10) || 0;
      const days = parseInt(s.days, 10) || 0;
      const calculated_start = add_offset_days(anchor, offset_days);
      const start_date = calculated_start ? to_date_input(calculated_start) : '';
      let end_date = s.end_date;

      if (calculated_start && days > 0) {
        const calculated_end = add_working_days(calculated_start, days);
        end_date = calculated_end ? to_date_input(calculated_end) : '';
      }

      next[item_id] = { ...s, start_date, end_date };

      if (start_date && end_date && (start_date !== s.start_date || end_date !== s.end_date)) {
        changes.push({ item_id, offset_days, days, start_date, end_date });
      }
    });

    set_schedules(next);

    if (on_item_schedule_change) {
      changes.forEach(({ item_id, offset_days, days, start_date, end_date }) => {
        on_item_schedule_change(item_id, {
          offset_days,
          days,
          start_date: moment(start_date).startOf('day').toISOString(),
          end_date: moment(end_date).endOf('day').toISOString(),
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [global_start]);

  const working_days = useMemo(() => {
    if (!global_start || !global_end) return [];
    return get_working_days_between(global_start, global_end);
  }, [global_start, global_end]);

  const header = useMemo(() => build_header(working_days), [working_days]);

  const total_days_per_item = useMemo(() => {
    const result: Record<string, number> = {};
    items.forEach((item) => {
      const s = schedules[item._id];
      result[item._id] = s ? (s.days || 0) : 0;
    });
    return result;
  }, [items, schedules]);

  const on_global_start_change = (e: any) => {
    const value = e.target.value;
    set_global_start(value);
    if (on_module_dates_change) {
      on_module_dates_change({ start_date: moment(value).startOf('day').toISOString() });
    }
  };

  const on_global_end_change = (e: any) => {
    const value = e.target.value;
    set_global_end(value);
    if (on_module_dates_change) {
      on_module_dates_change({ end_date: moment(value).endOf('day').toISOString() });
    }
  };

  const update_schedule = useCallback((item_id: any, field: any, value: any) => {
    if (!item_id) throw new Error('item_id is undefined');
    if (!field) throw new Error('field is undefined');

    const current = schedules[item_id] || { offset_days: 0, days: 0, start_date: '', end_date: '' };
    let updated = { ...current, [field]: value };

    // Recalculate start/end date when the offset from the module start or the duration changes
    if (field === 'offset_days' || field === 'days') {
      const offset_days = field === 'offset_days' ? (parseInt(value, 10) || 0) : (parseInt(current.offset_days, 10) || 0);
      const days = field === 'days' ? (parseInt(value, 10) || 0) : (parseInt(current.days, 10) || 0);
      updated.offset_days = offset_days;

      const calculated_start = global_start ? add_offset_days(global_start, offset_days) : null;
      updated.start_date = calculated_start ? to_date_input(calculated_start) : '';

      if (calculated_start && days > 0) {
        const calculated_end = add_working_days(calculated_start, days);
        updated.end_date = calculated_end ? to_date_input(calculated_end) : '';
      }
    }

    // Editing the start date directly: re-derive "días desde inicio" from the
    // module's own start date (day 0 = the module's start date), keep the
    // current duration by shifting the end date along with it.
    if (field === 'start_date') {
      const days = parseInt(current.days, 10) || 0;

      if (global_start && value) {
        updated.offset_days = Math.max(count_working_days(global_start, value) - 1, 0);
      }

      if (value && days > 0) {
        const calculated_end = add_working_days(value, days);
        updated.end_date = calculated_end ? to_date_input(calculated_end) : '';
      }
    }

    // Recalculate days when end date changes directly
    if (field === 'end_date') {
      if (current.start_date && value) {
        const new_days = count_working_days(current.start_date, value);
        updated.days = new_days;
      }
    }

    set_schedules((prev) => ({ ...prev, [item_id]: updated }));

    if (on_item_schedule_change && updated.start_date && updated.end_date) {
      on_item_schedule_change(item_id, {
        offset_days: updated.offset_days || 0,
        days: updated.days || 0,
        start_date: moment(updated.start_date).startOf('day').toISOString(),
        end_date: moment(updated.end_date).endOf('day').toISOString(),
      });
    }
  }, [schedules, global_start, on_item_schedule_change]);

  return (
    <Dialog
      open={open}
      onClose={on_close}
      maxWidth={false}
      fullWidth
      onClick={(e) => e.stopPropagation()}
      PaperProps={{ className: 'schedule-dialog-paper' }}
    >
      <DialogTitle className="schedule-dialog__title">
        <span className="schedule-dialog__title-text">📅 Cronograma de Ejecución</span>
        <div className="schedule-dialog__global-dates">
          <TextField
            label="Inicio Módulo"
            type="date"
            size="small"
            value={global_start}
            onChange={on_global_start_change}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Fin Módulo"
            type="date"
            size="small"
            value={global_end}
            onChange={on_global_end_change}
            InputLabelProps={{ shrink: true }}
          />
          <span className="schedule-dialog__global-summary">
            {working_days.length} días hábiles
          </span>
        </div>
      </DialogTitle>

      <DialogContent className="schedule-dialog__content" onClick={(e) => e.stopPropagation()}>
        {working_days.length === 0 ? (
          <div className="schedule-dialog__empty">
            Selecciona un rango de fechas válido para generar el cronograma.
          </div>
        ) : (
          <div className="schedule-grid-wrapper">
            <table className="schedule-grid">
              {/* ---- HEADER ---- */}
              <thead>
                {/* Row 1: Months */}
                <tr>
                  <th className="schedule-grid__label-col schedule-grid__label-col--header" rowSpan={3}>
                    Construcción
                  </th>
                  <th className="schedule-grid__label-col schedule-grid__label-col--header" rowSpan={3}>
                    Días desde inicio
                  </th>
                  <th className="schedule-grid__label-col schedule-grid__label-col--header" rowSpan={3}>
                    Fecha inicio
                  </th>
                  <th className="schedule-grid__label-col schedule-grid__label-col--header" rowSpan={3}>
                    Duración (días)
                  </th>
                  <th className="schedule-grid__label-col schedule-grid__label-col--header" rowSpan={3}>
                    Fecha fin
                  </th>
                  <th className="schedule-grid__label-col schedule-grid__label-col--header" rowSpan={3}>
                    Horas
                  </th>
                  <th className="schedule-grid__label-col schedule-grid__label-col--header" rowSpan={3}>
                    Crítico
                  </th>
                  {header.months.map((m, i) => (
                    <th
                      key={i}
                      colSpan={m.count}
                      className="schedule-grid__month-header"
                    >
                      {m.label}
                    </th>
                  ))}
                </tr>
                {/* Row 2: Weeks */}
                <tr>
                  {header.weeks.map((w, i) => (
                    <th
                      key={i}
                      colSpan={w.count}
                      className="schedule-grid__week-header"
                    >
                      {w.label}
                    </th>
                  ))}
                </tr>
                {/* Row 3: Day labels */}
                <tr>
                  {working_days.map((day, i) => (
                    <th key={i} className="schedule-grid__day-header">
                      {DAY_LABELS[WORKING_DAYS.indexOf(day.getDay())]}
                      <span className="schedule-grid__day-num">{day.getDate()}</span>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* ---- BODY ---- */}
              <tbody>
                {items.map((item, row_idx) => {
                  const s: Partial<ItemSchedule> = schedules[item._id] || {};
                  const total_d = total_days_per_item[item._id] || 0;
                  const total_h = total_d * HOURS_PER_DAY;

                  return (
                    <tr
                      key={item._id}
                      className={`schedule-grid__row ${row_idx % 2 === 0 ? 'schedule-grid__row--even' : ''}`}
                    >
                      {/* Item name */}
                      <td className="schedule-grid__label-col schedule-grid__item-name">
                        <Tooltip title={item.description || item.name} placement="right">
                          <span>{item.name}</span>
                        </Tooltip>
                      </td>

                      {/* Días desde el inicio del módulo */}
                      <td className="schedule-grid__label-col">
                        <input
                          type="number"
                          min="0"
                          className="schedule-days-input"
                          value={s.offset_days ?? 0}
                          onChange={(e) => update_schedule(item._id, 'offset_days', e.target.value)}
                        />
                      </td>

                      {/* Fecha inicio del ítem (editable; también se puede fijar vía "Días desde inicio") */}
                      <td className={`schedule-grid__label-col ${item.is_critical ? 'schedule-grid__date-col--critical' : ''}`}>
                        <input
                          type="date"
                          className="schedule-date-input"
                          value={s.start_date || ''}
                          onChange={(e) => update_schedule(item._id, 'start_date', e.target.value)}
                        />
                      </td>

                      {/* Días */}
                      <td className="schedule-grid__label-col">
                        <input
                          type="number"
                          min="1"
                          className="schedule-days-input"
                          value={s.days || ''}
                          onChange={(e) => update_schedule(item._id, 'days', e.target.value)}
                        />
                      </td>

                      {/* Fecha fin del ítem (editable) */}
                      <td className={`schedule-grid__label-col ${item.is_critical ? 'schedule-grid__date-col--critical' : ''}`}>
                        <input
                          type="date"
                          className="schedule-date-input"
                          value={s.end_date || ''}
                          onChange={(e) => update_schedule(item._id, 'end_date', e.target.value)}
                        />
                      </td>

                      {/* Total horas */}
                      <td className="schedule-grid__label-col schedule-grid__hours">
                        <span className="schedule-grid__total-days">{total_d}d</span>
                        <span className="schedule-grid__total-hours">{total_h}h</span>
                      </td>

                      {/* Crítico */}
                      <td className="schedule-grid__label-col schedule-grid__critical-col">
                        <input
                          type="checkbox"
                          className="schedule-critical-checkbox"
                          checked={!!item.is_critical}
                          onChange={(e) => {
                            if (on_item_critical_change) {
                              on_item_critical_change(item._id, e.target.checked);
                            }
                          }}
                        />
                      </td>

                      {/* Gantt bar cells */}
                      <ItemScheduleBar
                        item_schedule={s}
                        working_days={working_days}
                        item={item}
                      />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </DialogContent>

      <DialogActions onClick={(e) => e.stopPropagation()}>
        <Button onClick={on_close}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export { ScheduleDialog };
