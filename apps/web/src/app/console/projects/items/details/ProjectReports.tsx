import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PrintIcon from '@mui/icons-material/Print';
import GridOnIcon from '@mui/icons-material/GridOn';

import { Container, Flex } from 'components/grids/v5';
import { useReduxReducer } from 'generics/functions/forms/v2';
import { toast } from 'generics/services/v4';
import actions from 'store/actions/console';
import { LinearList } from 'components/lists/v2';

import { GeneralBudgetReport, export_general_budget_report_to_excel } from '../reports/GeneralBudgetReport';
import { CategoryBudgetReport, export_category_budget_report_to_excel } from '../reports/CategoryBudgetReport';
import { UnitPriceAnalysisReport, export_unit_price_analysis_report_to_excel } from '../reports/UnitPriceAnalysisReport';
import { TechnicalSpecificationsReport, TechnicalSpecificationsIndex, NumberedSpecification } from '../reports/TechnicalSpecificationsReport';
import { ResourceBudgetReport, export_resource_budget_report_to_excel } from '../reports/ResourceBudgetReport';
import { ResourceBudgetByItemReport, export_resource_budget_by_item_report_to_excel } from '../reports/ResourceBudgetByItemReport';
import { ScheduleReport, export_schedule_report_to_excel } from '../reports/ScheduleReport';
import { AllReports } from '../reports/AllReports';
import { MetricCalculationReport, export_metric_calculation_report_to_excel } from '../reports/MetricCalculationReport';
import { resource_budget_report_titles, resource_budget_by_item_report_titles } from '../reports/report_titles';
import { ProjectModule } from 'app/models/project.model';

const build_numbered_specifications = (active_modules: ProjectModule[]) => {
  if (!active_modules) {
    throw new Error('active_modules is undefined');
  }

  return active_modules.reduce((acc, module) => {
    const numbered_constructions = module.constructions.map((construction, index) => ({
      module,
      construction,
      item_number: acc.length + index + 1,
    }));

    return [...acc, ...numbered_constructions];
  }, [] as NumberedSpecification[]);
};

const ProjectReports = () => {
  const dispatch = useDispatch();
  const [report, set_report] = useState('0');
  const project = useSelector((state: any) => state.project);
  const { materials, workers, tools } = useSelector((state: any) => state.project_assets);

  const on_change = useCallback((data: any) => {
    dispatch(actions.project.update(data));
  }, [dispatch]);

  useReduxReducer(project, on_change);

  const active_modules = project.modules.filter((module) => module.is_active);
  const numbered_specifications = build_numbered_specifications(active_modules);

  const report_links = [
    { _id: '0', name: 'TODOS' },
    { _id: '1', name: 'Presupuesto General' },
    { _id: '2', name: 'Presupuesto por Categoría' },
    { _id: '3', name: 'Análisis de Precios Unitarios' },
    { _id: '5', name: 'Materiales' },
    { _id: '6', name: 'Mano de Obra' },
    { _id: '7', name: 'Htas. y Equipos' },
    { _id: '8', name: "Materiales por Item's" },
    { _id: '9', name: "Mano de Obra por Item's" },
    { _id: '10', name: "Htas. y Equipos por Item's" },
    { _id: '11', name: "Computo Metrico" },
    { _id: '12', name: 'Cronograma de Ejecución' },
    { _id: '4', name: 'Especificaciones Técnicas' },
  ];

  const selected_report_link = report_links.find((link) => link._id === report);

  const on_change_report = (link: any) => {
    if (!link) {
      throw new Error('link is undefined');
    }
    set_report(link._id);
  };

  const on_print = () => {
    window.print();
  };

  const on_export_excel = () => {
    switch (report) {
      case '1':
        export_general_budget_report_to_excel(project);
        break;
      case '2':
        export_category_budget_report_to_excel(project);
        break;
      case '3':
        export_unit_price_analysis_report_to_excel(project);
        break;
      case '5':
        export_resource_budget_report_to_excel(project, resource_budget_report_titles.materials);
        break;
      case '6':
        export_resource_budget_report_to_excel(project, resource_budget_report_titles.workers);
        break;
      case '7':
        export_resource_budget_report_to_excel(project, resource_budget_report_titles.tools);
        break;
      case '8':
        export_resource_budget_by_item_report_to_excel(project, resource_budget_by_item_report_titles.materials);
        break;
      case '9':
        export_resource_budget_by_item_report_to_excel(project, resource_budget_by_item_report_titles.workers);
        break;
      case '10':
        export_resource_budget_by_item_report_to_excel(project, resource_budget_by_item_report_titles.tools);
        break;
      case '11':
        export_metric_calculation_report_to_excel(project);
        break;
      case '12':
        export_schedule_report_to_excel(project);
        break;
      default:
        toast.warning('La exportación a Excel no está disponible para este reporte');
    }
  };

  return (
    <Flex class_name="text-separator">
      <Flex.Item>
        <Flex direction={Flex.H}>
          <Flex.Item flex={3}>
            <Flex.End class_name="cobra-reports-toolbar no-print">
              <Tooltip title="Exportar a Excel">
                <IconButton size="small" onClick={on_export_excel}>
                  <GridOnIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Imprimir">
                <IconButton size="small" onClick={on_print}>
                  <PrintIcon />
                </IconButton>
              </Tooltip>
            </Flex.End>
            <Container width="1200px" height="auto" class_name="cobra-reports cobra-print-area">
              {
                report === '0' && (
                  <AllReports
                    project={project}
                    active_modules={active_modules}
                    materials={materials}
                    workers={workers}
                    tools={tools}
                  />
                )
              }
              {
                report === '1' && (
                  <GeneralBudgetReport project={project} />
                )
              }
              {
                report === '2' && (
                  <CategoryBudgetReport project={project} />
                )
              }
              {
                report === '3' && active_modules.map((module) => module.constructions.map((construction) => (
                  <UnitPriceAnalysisReport
                    key={construction._id}
                    project={project}
                    module={module}
                    construction={construction}
                  />
                )))
              }
              {
                report === '4' && (
                  <>
                    <TechnicalSpecificationsIndex active_modules={active_modules} />
                    {
                      numbered_specifications.map(({ module, construction, item_number }) => (
                        <TechnicalSpecificationsReport
                          key={construction._id}
                          project={project}
                          module={module}
                          construction={construction}
                          item_number={item_number}
                        />
                      ))
                    }
                  </>
                )
              }
              {
                report === '5' && (
                  <ResourceBudgetReport project={project} resource_type="materials" resources={materials} title={resource_budget_report_titles.materials} />
                )
              }
              {
                report === '6' && (
                  <ResourceBudgetReport project={project} resource_type="workers" resources={workers} title={resource_budget_report_titles.workers} />
                )
              }
              {
                report === '7' && (
                  <ResourceBudgetReport project={project} resource_type="tools" resources={tools} title={resource_budget_report_titles.tools} />
                )
              }
              {
                report === '8' && (
                  <ResourceBudgetByItemReport project={project} resource_type="materials" resources={materials} title={resource_budget_by_item_report_titles.materials} />
                )
              }
              {
                report === '9' && (
                  <ResourceBudgetByItemReport project={project} resource_type="workers" resources={workers} title={resource_budget_by_item_report_titles.workers} />
                )
              }
              {
                report === '10' && (
                  <ResourceBudgetByItemReport project={project} resource_type="tools" resources={tools} title={resource_budget_by_item_report_titles.tools} />
                )
              }
              {
                report === '11' && (
                  <MetricCalculationReport project={project} />
                )
              }
              {
                report === '12' && (
                  <ScheduleReport project={project} />
                )
              }
            </Container>
          </Flex.Item>
          <Flex.Item flex={1}>
            <LinearList
              items={report_links}
              item={selected_report_link}
              on_select={on_change_report}
            />
          </Flex.Item>
        </Flex>
      </Flex.Item>
    </Flex>
  );
};

export { ProjectReports };
