import { GeneralBudgetReport } from './GeneralBudgetReport';
import { CategoryBudgetReport } from './CategoryBudgetReport';
import { MetricCalculationReport } from './MetricCalculationReport';
import { UnitPriceAnalysisReport } from './UnitPriceAnalysisReport';
import { TechnicalSpecificationsReport, TechnicalSpecificationsIndex, NumberedSpecification } from './TechnicalSpecificationsReport';
import { ResourceBudgetReport } from './ResourceBudgetReport';
import { ResourceBudgetByItemReport } from './ResourceBudgetByItemReport';
import { ScheduleReport } from './ScheduleReport';
import { resource_budget_report_titles, resource_budget_by_item_report_titles } from './report_titles';
import { Project, ProjectModule } from 'app/models/project.model';

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

interface AllReportsProps {
  project: Project;
  active_modules: ProjectModule[];
  materials: any[];
  workers: any[];
  tools: any[];
}

const AllReports = ({ project, active_modules, materials, workers, tools }: AllReportsProps) => {
  if (!project) {
    throw new Error('project is undefined');
  }
  if (!active_modules) {
    throw new Error('active_modules is undefined');
  }

  const numbered_specifications = build_numbered_specifications(active_modules);

  return (
    <div>
      <GeneralBudgetReport project={project} />
      <CategoryBudgetReport project={project} />
      {
        active_modules.map((module) => module.constructions.map((construction) => (
          <UnitPriceAnalysisReport
            key={construction._id}
            project={project}
            module={module}
            construction={construction}
          />
        )))
      }
      
      <ResourceBudgetReport project={project} resource_type="materials" resources={materials} title={resource_budget_report_titles.materials} />
      <ResourceBudgetReport project={project} resource_type="workers" resources={workers} title={resource_budget_report_titles.workers} />
      <ResourceBudgetReport project={project} resource_type="tools" resources={tools} title={resource_budget_report_titles.tools} />
      {/* <ResourceBudgetByItemReport project={project} resource_type="materials" resources={materials} title={resource_budget_by_item_report_titles.materials} />
      <ResourceBudgetByItemReport project={project} resource_type="workers" resources={workers} title={resource_budget_by_item_report_titles.workers} />
      <ResourceBudgetByItemReport project={project} resource_type="tools" resources={tools} title={resource_budget_by_item_report_titles.tools} /> */}
      <MetricCalculationReport project={project} />
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
      {/* <ScheduleReport project={project} /> */}
    </div>
  );
};

export { AllReports };
