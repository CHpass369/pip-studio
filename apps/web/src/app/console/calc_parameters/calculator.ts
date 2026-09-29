import { ConstructionPrices } from 'app/models/project.model';
import { Parameter } from 'app/models/parameter.model';
import { Resource, ResourceLine } from 'app/models/resource.model';

// the part of a construction the unit price is calculated from
interface PricedConstruction {
  materials: ResourceLine[];
  workers: ResourceLine[];
  tools: ResourceLine[];
  prices: ConstructionPrices;
}

const calculate = (parameters: Parameter[], budget: number[]) => {
  const new_budget = [ ...budget ];
  parameters.forEach((parameter) => {
    if (parameter.formula === '*') return;

    const formulas = parameter.formula.split('+');
    const total = formulas.reduce((acc, formula) => {
      const index = parameters.findIndex((p) => p.key === formula);

      if (index > -1) {
        if (parameter.is_total) {
          acc += new_budget[index] + ((parameter.ratio * new_budget[index]) / 100);
        } else {
          acc += (parameter.ratio * new_budget[index]) / 100;
        }
      }
      return acc;
    }, 0);

    new_budget.push(total);
  });

  return new_budget;
};

const calculate_unit_price = (parameters: Parameter[], construction: PricedConstruction) => {
  if (!parameters) {
    throw new Error('parameters is undefined');
  }
  if (!construction) {
    throw new Error('construction is undefined');
  }

  if (!Array.isArray(construction.materials)) {
    throw new Error('materials must be array');
  }
  if (!Array.isArray(construction.workers)) {
    throw new Error('workers must be array');
  }
  if (!Array.isArray(construction.tools)) {
    throw new Error('tools must be array');
  }

  const prices = construction.prices;
  const budget = [prices.materials, prices.workers, prices.tools];
  const calculated_budget = calculate(parameters, budget);

  return calculated_budget[calculated_budget.length - 1];
};

const construction_total_course = (items: ResourceLine[], data: Resource[], is_construction: boolean) => {
  return items.reduce((acc, c) => {
    const src = data.find((data) => data._id === c._id);

    if (src) {
      if (is_construction) {
        return acc + (c.price * c.quantity);
      } else {
        return acc + (src.price * c.quantity);
      }
    } else {
      return acc;
    }
  }, 0);
};

export { calculate, calculate_unit_price, construction_total_course };
