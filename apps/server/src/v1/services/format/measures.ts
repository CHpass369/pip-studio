import { GeneratorRepository, GeneratorType } from 'apps-generic';
import { Measure } from '../../../models/measure';

export const format_measure_data = async (items: any[], measure_type: GeneratorType<Measure>) => {
  if (!items) {
    throw new Error('items is undefined');
  }
  if (!measure_type) {
    throw new Error('measure_type is undefined');
  }

  return await Promise.all(items.map(async (item) => {

    if (item.measure_id) {
      const measure = await GeneratorRepository.find_by_id(measure_type, item.measure_id);

      return {
        ...item,
        measure,
      };
    }

    return {
      ...item,
      measure: null,
    };
  }));
};
