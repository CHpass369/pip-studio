import { GeneratorRepository, GeneratorType } from 'apps-generic';
import { Parameter } from '../../../models/parameter';

export const format_parameter_data = async (items: any[], parameter_type: GeneratorType<Parameter>) => {
  if (!items) {
    throw new Error('items is undefined');
  }
  if (!parameter_type) {
    throw new Error('parameter_type is undefined');
  }

  return await Promise.all(items.map(async (item) => {

    if (item.parameter_id) {
      const parameter = await GeneratorRepository.find_by_id(parameter_type, item.parameter_id);
      return {
        ...item,
        parameters: parameter?.parameters,
      };
    }

    return {
      ...item,
    };
  }));
};
