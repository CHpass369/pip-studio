import React from 'react';
import moment from 'moment';

import { get_currency } from '../../constants';
import { Project } from 'app/models/project.model';

interface ReportInfoHeaderProps {
  title: React.ReactNode;
  project: Project;
  currency_key?: string;
  date_key?: string;
  children?: React.ReactNode;
}

const ReportInfoHeader = ({ title, project, currency_key, date_key, children }: ReportInfoHeaderProps) => {
  if (!project) {
    throw new Error('project is undefined');
  }

  const currency = get_currency(project.currency?.local);
  const date = (project as Record<string, any>)[date_key || 'updated'];

  return (
    <>
      <h2>{title}</h2>
      <table>
        <tbody>
          <tr>
            <td>Proyecto: {project.name}</td>
            <td className="text-right">Lugar: {project.address}</td>
          </tr>
          {children}
          <tr>
            <td>Moneda: {(currency as Record<string, any> | undefined)?.[currency_key || 'name']}</td>
            <td className="text-right">
              Fecha: {date ? moment(date).format('DD/MM/YYYY') : ''}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export { ReportInfoHeader };
