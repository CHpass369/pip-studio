import React from 'react';
import { useSelector } from 'react-redux';

import { ReportPage } from './ReportPage';
import { ReportInfoHeader } from './ReportInfoHeader';
import { format_number, get_measure, get_active_modules, export_tables_to_excel } from './report_utils';
import { Project, ProjectModule } from 'app/models/project.model';

import './Reports.scss';

const module_total = (module: ProjectModule) => module.constructions.reduce(
  (acc, construction) => acc + (construction.quantity * construction.unit_price),
  0,
);

const build_report_data = (project: Project) => {
  if (!project) {
    throw new Error('project is undefined');
  }

  const active_modules = get_active_modules(project);
  const omit_subtotals = active_modules.length === 1;

  const grand_total = active_modules.reduce((acc, module) => acc + module_total(module), 0);

  const module_offsets = active_modules.reduce((acc) => {
    const previous_offset = acc.length > 0 ? acc[acc.length - 1] : 0;
    const previous_count = acc.length > 0 ? active_modules[acc.length - 1].constructions.length : 0;
    acc.push(previous_offset + previous_count);
    return acc;
  }, [] as number[]);

  const numbered_modules = active_modules.map((module, module_index) => ({
    module,
    numbered_constructions: [...module.constructions]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((construction, construction_index) => ({
        construction,
        item_number: module_offsets[module_index] + construction_index + 1,
      })),
  }));

  return { omit_subtotals, grand_total, numbered_modules };
};

const export_general_budget_report_to_excel = (project: Project) => {
  if (!project) {
    throw new Error('project is undefined');
  }

  const info_table = document.querySelector('.general-budget-report .info-table table');
  const content_table = document.querySelector('.general-budget-report .content-table table');

  if (!content_table) {
    throw new Error('table is undefined');
  }

  const tables = [info_table, content_table].filter(Boolean);

  export_tables_to_excel(tables, `presupuesto_general_${project.name || 'proyecto'}.xls`);
};

interface GeneralBudgetReportProps {
  project: Project;
}

const GeneralBudgetReport = ({ project }: GeneralBudgetReportProps) => {
  const { measures } = useSelector((state: any) => state.project_assets);
  const { settings } = useSelector((state: any) => state.settings);
  const round = settings?.round ?? 2;

  const { omit_subtotals, grand_total, numbered_modules } = build_report_data(project);

  return (
    <ReportPage class_name="general-budget-report">
      <ReportPage.InfoTable>
        <ReportInfoHeader title="PRESUPUESTO GENERAL" project={project} />
      </ReportPage.InfoTable>
      <ReportPage.ContentTable>
        <table>
          <thead>
            <tr>
              <td>N</td>
              <td>Descripción</td>
              <td>Unid.</td>
              <td>Cantidad</td>
              <td>Precio U</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {numbered_modules.map(({ module, numbered_constructions }, module_index) => (
              <React.Fragment key={module._id}>
                {!omit_subtotals && (
                  <tr className="module-row">
                    <td>{`${module_index + 1}.-`}</td>
                    <td>{module.name?.toUpperCase()}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-right">
                      {format_number(module_total(module), round)}
                    </td>
                  </tr>
                )}
                {numbered_constructions.map(({ construction, item_number }) => (
                  <tr key={construction._id}>
                    <td>{item_number}</td>
                    <td>{construction.name}</td>
                    <td>{get_measure(construction.measure_id, measures)}</td>
                    <td className="text-right">
                      {format_number(construction.quantity, round)}
                    </td>
                    <td className="text-right">
                      {format_number(construction.unit_price, round)}
                    </td>
                    <td className="text-right">
                      {format_number(construction.quantity * construction.unit_price, round)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
            <tr className="total-row">
              <td></td>
              <td>TOTAL PRESUPUESTO</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-right">
                {format_number(grand_total, round)}
              </td>
            </tr>
          </tbody>
        </table>
      </ReportPage.ContentTable>
    </ReportPage>
  );
};

export { GeneralBudgetReport, export_general_budget_report_to_excel };
