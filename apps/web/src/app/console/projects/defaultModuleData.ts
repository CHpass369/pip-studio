import { v4 as uuidv4 } from 'uuid';
import { calculate_unit_price } from '../calc_parameters/calculator';
import { Parameter } from 'app/models/parameter.model';
import { Project, ProjectConstruction, ProjectConstructionBase, ProjectModule } from 'app/models/project.model';

/**
 * Generates a default structure for a new module.
 * @returns {object} The default module object.
 */
export const createDefaultModule = (): ProjectModule => ({
  _id: uuidv4(),
  name: 'Modulo unico',
  constructions: [],
  is_active: true,
  start_date: new Date().toISOString(),
  end_date: new Date().toISOString(),
  is_lock: false,
  locked_by: null,
  is_production: false,
});

export const duplicate_module = (module: ProjectModule): ProjectModule => {
  if (!module) {
    throw new Error('module is undefined');
  }
  return {
    ...module,
    _id: uuidv4(),
    name: `${module.name} (copia)`,
    is_lock: false,
    locked_by: null,
    constructions: module.constructions.map((construction) => ({
      ...construction,
      _id: uuidv4(),
    })),
  };
};

export const populate_construction_totals = (parameters: Parameter[], construction: ProjectConstructionBase): ProjectConstruction => {
  const prices = {
    materials: construction.materials.reduce((acc, o) => acc + (o.price * o.quantity), 0),
    tools: construction.tools.reduce((acc, o) => acc + (o.price * o.quantity), 0),
    workers: construction.workers.reduce((acc, o) => acc + (o.price * o.quantity), 0),
  };

  const unit_price = calculate_unit_price(parameters, { ...construction, prices });

  return {
    ...construction,
    prices,
    unit_price,
    sub_total: construction.quantity * unit_price,
  };
};

export const project_total = (project: Project) => {
  const result = { ...project };

  const convert = (acc: number, item: ProjectModule) => {
    item.constructions.map((construction) => {
      const truc = populate_construction_totals(result.parameters, construction);
      acc += truc.sub_total;
    });

    return acc;
  };

  return result.modules.reduce(convert, 0);
};
