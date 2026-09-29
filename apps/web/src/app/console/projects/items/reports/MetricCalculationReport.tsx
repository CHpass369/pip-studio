import React from 'react';
import { useSelector } from 'react-redux';

import { ReportPage } from './ReportPage';
import { ReportInfoHeader } from './ReportInfoHeader';
import {
  format_number, get_measure, get_active_modules, export_tables_to_excel,
} from './report_utils';
import { Project, ProjectConstruction } from 'app/models/project.model';

import './Reports.scss';

const calculate_parcial = (parameters: any) => {
  if (!parameters) {
    throw new Error('parameters is undefined');
  }

  const { type, item } = parameters;
  const times = parseFloat(item.times) || 0;
  const x = parseFloat(item.x) || 0;
  const y = parseFloat(item.y) || 0;
  const z = parseFloat(item.z) || 0;

  if (type === 'm2') {
    return times * x * y;
  }
  if (type === 'm3') {
    return times * x * y * z;
  }

  return times * x;
};

const build_construction_rows = (construction: ProjectConstruction) => {
  if (!construction) {
    throw new Error('construction is undefined');
  }

  const calculation = construction.metric_calculation?.calculation || [];
  const type = construction.metric_calculation?.type || 'grl';

  const rows = calculation.map((item) => ({
    item,
    parcial: calculate_parcial({ type, item }),
  }));

  const total = rows.reduce((acc, row) => acc + row.parcial, 0);

  return { rows, total };
};

const build_module_rows = (project: Project) => {
  if (!project) {
    throw new Error('project is undefined');
  }

  const active_modules = get_active_modules(project);

  return active_modules
    .map((module) => {
      const constructions = module.constructions
        .filter((construction) => construction.metric_calculation?.calculation?.length > 0)
        .map((construction) => ({
          construction,
          ...build_construction_rows(construction),
        }));

      return { module, constructions };
    })
    .filter(({ constructions }) => constructions.length > 0);
};

const export_metric_calculation_report_to_excel = (project: Project) => {
  if (!project) {
    throw new Error('project is undefined');
  }

  const info_table = document.querySelector('.metric-calculation-report .info-table table');
  const content_table = document.querySelector('.metric-calculation-report .content-table table');

  if (!content_table) {
    throw new Error('table is undefined');
  }

  const tables = [info_table, content_table].filter(Boolean);

  export_tables_to_excel(tables, `computo_metrico_${project.name || 'proyecto'}.xls`);
};

interface MetricCalculationReportProps {
  project: Project;
}

const MetricCalculationReport = ({ project }: MetricCalculationReportProps) => {
  const { measures } = useSelector((state: any) => state.project_assets);
  const { settings } = useSelector((state: any) => state.settings);
  const round = settings?.round ?? 2;

  if (!project) {
    throw new Error('project is undefined');
  }

  const modules = build_module_rows(project);

  let item_number = 0;

  return (
    <ReportPage class_name="metric-calculation-report">
      <ReportPage.InfoTable>
        <ReportInfoHeader title="COMPUTOS METRICOS" project={project} />
      </ReportPage.InfoTable>

      <ReportPage.ContentTable>
        <table>
          <thead>
            <tr>
              <td>N°</td>
              <td>Descripción/parte</td>
              <td>Veces</td>
              <td>Dist. X</td>
              <td>Dist. Y</td>
              <td>Dist. Z</td>
              <td>Parcial</td>
            </tr>
          </thead>
          <tbody>
            {modules.map(({ module, constructions }, module_index) => (
              <React.Fragment key={module._id}>
                <tr className="module-row">
                  <td colSpan={7}>
                    {`(M${String(module_index + 1).padStart(2, '0')}) - ${module.name?.toUpperCase()}`}
                  </td>
                </tr>
                {constructions.map(({ construction, rows, total }) => {
                  item_number += 1;

                  return (
                    <React.Fragment key={construction._id}>
                      <tr className="item-row">
                        <td>{item_number}</td>
                        <td colSpan={6}>{construction.name}</td>
                      </tr>
                      {rows.map((row) => (
                        <tr key={row.item._id}>
                          <td></td>
                          <td className="indent">{row.item.name}</td>
                          <td className="text-right">{format_number(parseFloat(row.item.times) || 0, round)}</td>
                          <td className="text-right">{format_number(parseFloat(row.item.x) || 0, round)}</td>
                          <td className="text-right">{format_number(parseFloat(row.item.y) || 0, round)}</td>
                          <td className="text-right">{format_number(parseFloat(row.item.z) || 0, round)}</td>
                          <td className="text-right">{format_number(row.parcial, round)}</td>
                        </tr>
                      ))}
                      <tr className="resource-row">
                        <td></td>
                        <td colSpan={5} className="text-right">
                          {get_measure(construction.measure_id, measures)}
                        </td>
                        <td className="text-right">{format_number(total, round)}</td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </ReportPage.ContentTable>
    </ReportPage>
  );
};

export { MetricCalculationReport, export_metric_calculation_report_to_excel };
