import React from 'react';
import { useSelector } from 'react-redux';

import { calculate } from 'app/console/calc_parameters/calculator';
import { ReportPage } from './ReportPage';
import { ReportInfoHeader } from './ReportInfoHeader';
import { format_number, get_measure, export_tables_to_excel } from './report_utils';
import { Project, ProjectModule, ProjectConstruction } from 'app/models/project.model';

import './Reports.scss';

const EXPANDABLE_COUNT = 3;

const get_expandable_items = (parameter_index: any, construction: any) => {
  switch (parameter_index) {
    case 0:
      return construction.materials;
    case 1:
      return construction.workers;
    case 2:
      return construction.tools;
    default:
      return [];
  }
};

const build_row = (resource_entry: any, resources: any, measures: any) => {
  const resource = resources.find((data) => data._id === resource_entry._id);

  return {
    name: resource ? resource.name : '',
    measure: get_measure(resource ? resource.measure_id : null, measures),
    quantity: resource_entry.quantity,
    price: resource_entry.price,
    total: resource_entry.quantity * resource_entry.price,
  };
};

const export_unit_price_analysis_report_to_excel = (project: Project) => {
  if (!project) {
    throw new Error('project is undefined');
  }

  const report_pages = Array.from(document.querySelectorAll('.unit-price-analysis-report'));

  if (report_pages.length === 0) {
    throw new Error('table is undefined');
  }

  const tables = report_pages.flatMap((report_page) => [
    report_page.querySelector('.info-table table'),
    report_page.querySelector('.content-table table'),
  ].filter(Boolean));

  export_tables_to_excel(tables, `analisis_precios_unitarios_${project.name || 'proyecto'}.xls`);
};

interface UnitPriceAnalysisReportProps {
  project: Project;
  module: ProjectModule;
  construction: ProjectConstruction;
}

const UnitPriceAnalysisReport = ({ project, module, construction }: UnitPriceAnalysisReportProps) => {
  if (!project) {
    throw new Error('project is undefined');
  }
  if (!construction) {
    throw new Error('construction is undefined');
  }

  const { measures, materials, workers, tools } = useSelector((state: any) => state.project_assets);
  const { settings } = useSelector((state: any) => state.settings);
  const round = settings?.round ?? 2;
  const resources_by_index = [materials, workers, tools];

  const parameters = project.parameters || [];
  const partials = [
    construction.prices?.materials || 0,
    construction.prices?.workers || 0,
    construction.prices?.tools || 0,
  ];
  const budget = calculate(parameters, partials);

  const render_expanded_rows = (parameter_index: any) => {
    const items = get_expandable_items(parameter_index, construction);
    const resources = resources_by_index[parameter_index];
    const rows = items
      .map((entry) => build_row(entry, resources, measures))
      .sort((a, b) => a.name.localeCompare(b.name));

    return rows.map((row, index) => {
      return (
        <tr key={`${parameter_index}-${index}`} className="resource-row">
          <td></td>
          <td className="indent">{row.name}</td>
          <td>{row.measure}</td>
          <td className="text-right">{format_number(row.quantity, round)}</td>
          <td className="text-right">{format_number(row.price, round)}</td>
          <td className="text-right">{format_number(row.total, round)}</td>
        </tr>
      );
    });
  };

  const render_parameter_row = (parameter: any, index: number) => {
    const is_expandable = index < EXPANDABLE_COUNT;

    return (
      <React.Fragment key={parameter.key}>
        <tr className={(is_expandable || parameter.is_total) ? 'module-row' : undefined}>
          <td>{parameter.key}</td>
          <td>{parameter.label}</td>
          <td></td>
          <td></td>
          <td className="text-right">
            {parameter.ratio ? `${format_number(parameter.ratio, round)}%` : ''}
          </td>
          <td className="text-right">
            {is_expandable ? '' : format_number(budget[index], round)}
          </td>
        </tr>
        {is_expandable && render_expanded_rows(index)}
      </React.Fragment>
    );
  };

  return (
    <ReportPage class_name="unit-price-analysis-report">
      <ReportPage.InfoTable>
        <ReportInfoHeader title="ANALISIS DE PRECIOS UNITARIO" project={project}>
          <tr>
            <td>Actividad: {construction.name}</td>
            <td className="text-right">Modulo: {module ? module.name : ''}</td>
          </tr>
          <tr>
            <td>Unidad: {get_measure(construction.measure_id, measures)}</td>
            <td className="text-right">Cantidad: {format_number(construction.quantity, round)}</td>
          </tr>
        </ReportInfoHeader>
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
            {parameters.map(render_parameter_row)}
          </tbody>
        </table>
      </ReportPage.ContentTable>
    </ReportPage>
  );
};

export { UnitPriceAnalysisReport, export_unit_price_analysis_report_to_excel };
