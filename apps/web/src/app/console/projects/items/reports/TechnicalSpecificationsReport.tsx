import React from 'react';
import { useSelector } from 'react-redux';

import { ReportPage } from './ReportPage';
import { format_number, get_measure } from './report_utils';
import { Project, ProjectModule, ProjectConstruction } from 'app/models/project.model';

import './Reports.scss';
import './TechnicalSpecificationsReport.scss';

const SPECIFICATION_SECTIONS = [
  { key: 'definition', title: '1. Definición' },
  { key: 'equipment', title: '2. Materiales, Herramientas y Equipo' },
  { key: 'procedure', title: '3. Procedimiento para la Ejecución' },
  { key: 'measurement', title: '4. Medición' },
  { key: 'payment', title: '5. Forma de Pago' },
];

const RESOURCE_GROUPS = [
  { key: 'materials', letter: 'A', title: 'MATERIAL' },
  { key: 'workers', letter: 'B', title: 'MANO DE OBRA' },
  { key: 'tools', letter: 'C', title: 'EQUIPO' },
];

const build_resource_groups = (construction: any, resources_by_group: any, measures: any) => {
  if (!construction) {
    throw new Error('construction is undefined');
  }
  if (!resources_by_group) {
    throw new Error('resources_by_group is undefined');
  }
  if (!measures) {
    throw new Error('measures is undefined');
  }

  return RESOURCE_GROUPS.map((group) => {
    const entries = construction[group.key] || [];
    const resources = resources_by_group[group.key] || [];

    const rows = entries.map((entry) => {
      const resource = resources.find((data) => data._id === entry._id);

      return {
        _id: entry._id,
        name: resource ? resource.name : '',
        measure: get_measure(resource ? resource.measure_id : null, measures),
        quantity: entry.quantity,
      };
    });

    return { ...group, rows };
  }).filter((group) => group.rows.length > 0);
};

const build_specification_index = (active_modules: any, constructions: any, measures: any) => {
  if (!active_modules) {
    throw new Error('active_modules is undefined');
  }
  if (!constructions) {
    throw new Error('constructions is undefined');
  }
  if (!measures) {
    throw new Error('measures is undefined');
  }

  let item_number = 0;

  return active_modules.flatMap((module) => module.constructions.map((construction) => {
    item_number += 1;
    const catalog = constructions.find((c) => c._id === construction.construction_id);

    return {
      item_number,
      construction_id: construction._id,
      name: catalog ? catalog.name : '',
      measure: get_measure(construction.measure_id, measures),
    };
  }));
};

export interface NumberedSpecification {
  module: ProjectModule;
  construction: ProjectConstruction;
  item_number: number;
}

interface TechnicalSpecificationsIndexProps {
  active_modules: ProjectModule[];
}

const TechnicalSpecificationsIndex = ({ active_modules }: TechnicalSpecificationsIndexProps) => {
  const { constructions, measures } = useSelector((state: any) => state.project_assets);
  if (!active_modules) {
    throw new Error('active_modules is undefined');
  }

  const items = build_specification_index(active_modules, constructions, measures);

  return (
    <ReportPage class_name="technical-specifications-index">
      <div className="report-specifications-content">
        <h2 className="module-row">ÍNDICE</h2>
        <table>
          <thead>
            <tr>
              <td>N°</td>
              <td>Descripción</td>
              <td>Und.</td>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.construction_id}>
                <td>{item.item_number}</td>
                <td>{item.name}</td>
                <td>{item.measure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReportPage>
  );
};

interface TechnicalSpecificationsReportProps {
  project: Project;
  module: ProjectModule;
  construction: ProjectConstruction;
  item_number: number;
}

const TechnicalSpecificationsReport = ({ project, module, construction, item_number }: TechnicalSpecificationsReportProps) => {
  const { constructions, measures, materials, workers, tools } = useSelector((state: any) => state.project_assets);
  const { settings } = useSelector((state: any) => state.settings);
  const round = settings?.round ?? 2;
  if (!project) {
    throw new Error('project is undefined');
  }
  if (!construction) {
    throw new Error('construction is undefined');
  }

  const  { name, especifications = {} } = constructions.find((c) => c._id === construction.construction_id);
  
  

  const resources_by_group = { materials, workers, tools };
  const resource_groups = build_resource_groups(construction, resources_by_group, measures);

  const get_resource_group_rows = () => {
    return (
      <table>
        <thead>
          <tr>
            <td>N°</td>
            <td>P.</td>
            <td>Insumo/Parámetro</td>
            <td>Und.</td>
            <td>Cant.</td>
          </tr>
        </thead>
        <tbody>
          {resource_groups.map((group) => (
            <React.Fragment key={group.key}>
              <tr className="module-row">
                <td></td>
                <td>{group.letter}</td>
                <td colSpan={3}>{group.title}</td>
              </tr>
              {group.rows.map((row, index) => (
                <tr key={row._id}>
                  <td>{index + 1}</td>
                  <td>-</td>
                  <td>{row.name}</td>
                  <td>{row.measure}</td>
                  <td className="text-right">{format_number(row.quantity, round)}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <ReportPage class_name="technical-specifications-report" is_page={false}>
      <div className="report-specifications-content">
        <h2 className="module-row"><b>{item_number ? `${item_number}. ${name}` : name}</b></h2>
        {SPECIFICATION_SECTIONS.map((section) => (
          <React.Fragment key={section.key}>
            <h3>
              {section.title}
            </h3>
            <p>
              {especifications[section.key] || ''}
            </p>
            <div>
              {
                section.key === 'equipment' && get_resource_group_rows()
              }
            </div>
          </React.Fragment>
        ))}
      </div>
    </ReportPage>
  );
};

export { TechnicalSpecificationsReport, TechnicalSpecificationsIndex };
