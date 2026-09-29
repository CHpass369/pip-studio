import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const build_report_style_vars = (report_style: any) => {
  if (!report_style) {
    return {};
  }

  const style: Record<string, string> = {};

  if (report_style.color) {
    style['--report-color'] = report_style.color;
  }
  if (report_style.font_size) {
    style['--report-font-size'] = `${report_style.font_size}px`;
  }
  if (report_style.font_family) {
    style['--report-font-family'] = report_style.font_family;
  }
  if (report_style.table_header_color) {
    style['--report-table-header-color'] = report_style.table_header_color;
  }
  if (report_style.modules_color) {
    style['--report-modules-color'] = report_style.modules_color;
  }
  if (report_style.total_color) {
    style['--report-total-color'] = report_style.total_color;
  }

  return style;
};

interface ReportPageProps {
  children?: React.ReactNode;
  class_name?: string;
  is_page?: boolean;
}

const ReportPage = ({ children, class_name, is_page = true }: ReportPageProps) => {
  const { settings } = useSelector((state: any) => state.settings);

  const style = build_report_style_vars(settings?.report_style);

  return (
    <div className={classNames('cobra-report', class_name, { 'page': is_page })} style={style as React.CSSProperties}>
      {children}
    </div>
  );
};

interface InfoTableProps {
  children?: React.ReactNode;
}

const InfoTable = ({ children }: InfoTableProps) => (
  <div className="info-table">
    {children}
  </div>
);

interface ContentTableProps {
  children?: React.ReactNode;
}

const ContentTable = ({ children }: ContentTableProps) => (
  <div className="content-table">
    {children}
  </div>
);

ReportPage.InfoTable = InfoTable;
ReportPage.ContentTable = ContentTable;

export { ReportPage };
