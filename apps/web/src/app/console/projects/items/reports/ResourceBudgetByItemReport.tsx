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

const build_item_rows = (construction: any, resource_type: any, resources: any, measures: any) => {
  const entries = construction[resource_type] || [];

  const resource_rows = entries.map((entry) => {
    const resource = resources.find((data) => data._id === entry._id);
    const name = resource ? resource.name : '';
    const measure = get_measure(resource ? resource.measure_id : null, measures);
    const quantity = entry.quantity * construction.quantity;

    return { name, measure, quantity, price: entry.price, total: quantity * entry.price };
  }).sort((a, b) => a.name.localeCompare(b.name));

  const item_total = resource_rows.reduce((acc, row) => acc + row.total, 0);

  return { construction, resource_rows, item_total };
};

const build_module_rows = (project: any, resource_type: any, resources: any, measures: any) => {
  const active_modules = get_active_modules(project);

  return active_modules.map((module) => {
    const items = [...module.constructions]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((construction) => build_item_rows(construction, resource_type, resources, measures));

    const module_total = items.reduce((acc, item) => acc + item.item_total, 0);

    return { module, items, module_total };
  });
};

const export_resource_budget_by_item_report_to_excel = (project: any, title: string) => {
  if (!project) {
    throw new Error('project is undefined');
  }
  if (!title) {
    throw new Error('title is undefined');
  }

  const info_table = document.querySelector('.resource-budget-by-item-report .info-table table');
  const content_table = document.querySelector('.resource-budget-by-item-report .content-table table');

  if (!content_table) {
    throw new Error('table is undefined');
  }

  const tables = [info_table, content_table].filter(Boolean);

  export_tables_to_excel(tables, `${slugify(title)}_${project.name || 'proyecto'}.xls`);
};

interface ResourceBudgetByItemReportProps {
  project: Project;
  resource_type: ResourceType;
  resources: any[];
  title: any;
}

const ResourceBudgetByItemReport = ({ project, resource_type, resources, title }: ResourceBudgetByItemReportProps) => {
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

  const modules = build_module_rows(project, resource_type, resources, measures);
  const omit_module_subtotals = modules.length === 1;
  const grand_total = modules.reduce((acc, module) => acc + module.module_total, 0);

  let item_number = 0;

  return (
    <ReportPage class_name="resource-budget-by-item-report">
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
            {modules.map(({ module, items, module_total }, module_index) => (
              <React.Fragment key={module._id}>
                {!omit_module_subtotals && (
                  <tr className="module-row">
                    <td>{`${module_index + 1}.-`}</td>
                    <td>{module.name?.toUpperCase()}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-right">
                      {format_number(module_total, round)}
                    </td>
                  </tr>
                )}
                {items.map(({ construction, resource_rows, item_total }) => {
                  item_number += 1;

                  return (
                    <React.Fragment key={construction._id}>
                      <tr className="item-row">
                        <td>{item_number}</td>
                        <td>{construction.name}</td>
                        <td>{get_measure(construction.measure_id, measures)}</td>
                        <td></td>
                        <td></td>
                        <td className="text-right">
                          {format_number(item_total, round)}
                        </td>
                      </tr>
                      {resource_rows.map((row, row_index) => (
                        <tr key={`${construction._id}-${row.name}-${row.price}`} className="resource-row">
                          <td>{row_index + 1}</td>
                          <td className="indent">{row.name}</td>
                          <td>{row.measure}</td>
                          <td className="text-right">{format_number(row.quantity, round)}</td>
                          <td className="text-right">{format_number(row.price, round)}</td>
                          <td className="text-right">{format_number(row.total, round)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
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

export { ResourceBudgetByItemReport, export_resource_budget_by_item_report_to_excel };
