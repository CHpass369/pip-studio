import { GeneratorRepository, GeneratorService, GeneratorType } from 'apps-generic';
import type { NextFunction, Request, Response } from 'express';
import { Project } from '../../models/project';
import { Parameter } from '../../models/parameter';
import { format_parameter_data } from './format/parameters';
import { build_search } from './utils/search';

export class ProjectService extends GeneratorService {

  static show_with_parameters(type: GeneratorType<Project>, parameter_type: GeneratorType<Parameter>) {
    if (!type) {
      throw new Error('type is undefined');
    }
    if (!parameter_type) {
      throw new Error('parameter_type is undefined');
    }

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const item = (req as any)[type.db_name] || {};

        if (item.parameter_id) {
          const parameter = await GeneratorRepository.find_by_id(parameter_type, item.parameter_id);

          res.json({ ...item, parameters: parameter?.parameters });
          return;
        }

        res.json(item);
      } catch (err) {
        next(err);
      }
    }
  }

  static pagination_with_parameters(type: GeneratorType<Project>, parameter_type: GeneratorType<Parameter>) {
    if (!type) {
      throw new Error('type is undefined');
    }
    if (!parameter_type) {
      throw new Error('parameter_type is undefined');
    }

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const query: any = req.query || {};

        const search = build_search(query);
        if (query.zones) {
          const zones = Array.isArray(query.zones) ? query.zones : [query.zones];
          search.zones = { $in: zones };
        }

        const items = await GeneratorRepository.pagination(type, search, (req as any).page, (req as any).limit, { created: -1 });
        const result = await format_parameter_data(items, parameter_type);
        res.json(result);
      } catch (err) {
        next(err);
      }
    }
  }
}
