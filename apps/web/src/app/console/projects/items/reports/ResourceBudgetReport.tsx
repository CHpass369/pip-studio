import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { get_currency } from '../../constants';
import { ReportPage } from './ReportPage';

import './Reports.scss';
import { ReportInfoHeader } from './ReportInfoHeader';
import {
  format_number, get_measure, get_active_modules, export_tables_to_excel, slugify,
} from './report_utils';
import { Project } from 'app/models/project.model';
import { ResourceType } from 'app/models/resource.model';

const build_resource_rows = (project: any, resource_type: any, resources: any, measures: any) => {
  const active_modules = get_active_modules(project);
  const rows = new Map();

  active_modules.forEach((module) => {
    module.constructions.forEach((construction) => {
      const entries = construction[resource_type] || [];

      entries.forEach((entry) => {
        const resource = resources.find((data) => data._id === entry._id);
        const name = resource ? resource.name : '';
        const measure = get_measure(resource ? resource.measure_id : null, measures);
        const quantity = entry.quantity * construction.quantity;
        const key = `${name}-${entry.price}`;
        const existing = rows.get(key);

        if (existing) {
          existing.quantity += quantity;
          existing.total += quantity * entry.price;
        } else {
          rows.set(key, { name, measure, quantity, price: entry.price, total: quantity * entry.price });
        }
      });
    });
  });

  return Array.from(rows.values()).sort((a, b) => a.name.localeCompare(b.name));
};

const export_resource_budget_report_to_excel = (project: any, title: string) => {
  if (!project) {
    throw new Error('project is undefined');
  }
  if (!title) {
    throw new Error('title is undefined');
  }

  const info_table = document.querySelector('.resource-budget-report .info-table table');
  const content_table = document.querySelector('.resource-budget-report .content-table table');

  if (!content_table) {
    throw new Error('table is undefined');
  }

  const tables = [info_table, content_table].filter(Boolean);

  export_tables_to_excel(tables, `${slugify(title)}_${project.name || 'proyecto'}.xls`);
};

interface ResourceBudgetReportProps {
  project: Project;
  resource_type: ResourceType;
  resources: any[];
  title: any;
}

const ResourceBudgetReport = ({ project, resource_type, resources, title }: ResourceBudgetReportProps) => {
  if (!project) {
    throw new Error('project is undefined');
  }
  if (!resource_type) {
    throw new Error('resource_type is undefined');
  }
  if (!resources) {
    throw new Error('resources is undefined');
  }

  const { measures } = useSelector((state: any) => state.project_assets);
  const { settings } = useSelector((state: any) => state.settings);
  const round = settings?.round ?? 2;

  const rows = build_resource_rows(project, resource_type, resources, measures);
  const grand_total = rows.reduce((acc, row) => acc + row.total, 0);

  return (
    <ReportPage class_name="resource-budget-report">
      <ReportPage.InfoTable>
        <ReportInfoHeader title={title} project={project} />
      </ReportPage.InfoTable>

      <ReportPage.ContentTable>
        <table>
          <thead>
            <tr>
              <td>N</td>
              <td>Descripcion</td>
              <td>Unida</td>
              <td>Cantidad</td>
              <td>Precio U</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.name}-${row.price}`}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.measure}</td>
                <td className="text-right">{format_number(row.quantity, round)}</td>
                <td className="text-right">{format_number(row.price, round)}</td>
                <td className="text-right">{format_number(row.total, round)}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td></td>
              <td>{`TOTAL ${title}`}</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-right">{format_number(grand_total, round)}</td>
            </tr>
          </tbody>
        </table>
      </ReportPage.ContentTable>
    </ReportPage>
  );
};

export { ResourceBudgetReport, export_resource_budget_report_to_excel };
