import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { get_currency } from '../../constants';
import { ReportPage } from './ReportPage';

import './Reports.scss';
import { ReportInfoHeader } from './ReportInfoHeader';
import { format_number, get_active_modules, export_tables_to_excel } from './report_utils';
import { Project, ProjectConstruction } from 'app/models/project.model';

const sum_resource_total = (construction: any, resource_type: any) => {
  if (!construction) {
    throw new Error('construction is undefined');
  }
  if (!resource_type) {
    throw new Error('resource_type is undefined');
  }

  const entries = construction[resource_type] || [];

  return entries.reduce((acc, entry) => acc + (entry.quantity * construction.quantity * entry.price), 0);
};

const build_construction_row = (construction: ProjectConstruction) => ({
  construction,
  materials_total: sum_resource_total(construction, 'materials'),
  workers_total: sum_resource_total(construction, 'workers'),
  tools_total: sum_resource_total(construction, 'tools'),
});

const build_module_rows = (project: Project) => {
  if (!project) {
    throw new Error('project is undefined');
  }

  const active_modules = get_active_modules(project);

  return active_modules.map((module) => {
    const constructions = [...module.constructions]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(build_construction_row);

    const module_totals = constructions.reduce((acc, row) => ({
      materials_total: acc.materials_total + row.materials_total,
      workers_total: acc.workers_total + row.workers_total,
      tools_total: acc.tools_total + row.tools_total,
    }), { materials_total: 0, workers_total: 0, tools_total: 0 });

    return { module, constructions, module_totals };
  });
};

const export_category_budget_report_to_excel = (project: Project) => {
  if (!project) {
    throw new Error('project is undefined');
  }

  const info_table = document.querySelector('.category-budget-report .info-table table');
  const content_table = document.querySelector('.category-budget-report .content-table table');

  if (!content_table) {
    throw new Error('table is undefined');
  }

  const tables = [info_table, content_table].filter(Boolean);

  export_tables_to_excel(tables, `presupuesto_por_rubro_${project.name || 'proyecto'}.xls`);
};

interface CategoryBudgetReportProps {
  project: Project;
}

const CategoryBudgetReport = ({ project }: CategoryBudgetReportProps) => {
  if (!project) {
    throw new Error('project is undefined');
  }

  const { settings } = useSelector((state: any) => state.settings);
  const round = settings?.round ?? 2;

  const modules = build_module_rows(project);

  const grand_totals = modules.reduce((acc, module) => ({
    materials_total: acc.materials_total + module.module_totals.materials_total,
    workers_total: acc.workers_total + module.module_totals.workers_total,
    tools_total: acc.tools_total + module.module_totals.tools_total,
  }), { materials_total: 0, workers_total: 0, tools_total: 0 });

  let item_number = 0;

  return (
    <ReportPage class_name="category-budget-report">
      <ReportPage.InfoTable>
        <ReportInfoHeader title="PRESUPUESTO POR RUBROS" project={project} />
      </ReportPage.InfoTable>

      <ReportPage.ContentTable>
        <table>
          <thead>
            <tr>
              <td>N°</td>
              <td>Descripción Item</td>
              <td>MATERIAL</td>
              <td>OBRERO</td>
              <td>EQUIPO</td>
            </tr>
          </thead>
          <tbody>
            {modules.map(({ module, constructions, module_totals }, module_index) => (
              <React.Fragment key={module._id}>
                <tr className="module-row">
                  <td>{`M${String(module_index + 1).padStart(2, '0')}`}</td>
                  <td>{`- ${module.name?.toUpperCase()}`}</td>
                  <td className="text-right">
                    {format_number(module_totals.materials_total, round)}
                  </td>
                  <td className="text-right">
                    {format_number(module_totals.workers_total, round)}
                  </td>
                  <td className="text-right">
                    {format_number(module_totals.tools_total, round)}
                  </td>
                </tr>
                {constructions.map(({ construction, materials_total, workers_total, tools_total }) => {
                  item_number += 1;

                  return (
                    <tr key={construction._id}>
                      <td>{item_number}</td>
                      <td>{construction.name}</td>
                      <td className="text-right">
                        {format_number(materials_total, round)}
                      </td>
                      <td className="text-right">
                        {format_number(workers_total, round)}
                      </td>
                      <td className="text-right">
                        {format_number(tools_total, round)}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
            <tr className="total-row">
              <td></td>
              <td>{'Totales por rubro (Bs)'}</td>
              <td className="text-right">
                {format_number(grand_totals.materials_total, round)}
              </td>
              <td className="text-right">
                {format_number(grand_totals.workers_total, round)}
              </td>
              <td className="text-right">
                {format_number(grand_totals.tools_total, round)}
              </td>
            </tr>
          </tbody>
        </table>
      </ReportPage.ContentTable>
    </ReportPage>
  );
};

export { CategoryBudgetReport, export_category_budget_report_to_excel };
