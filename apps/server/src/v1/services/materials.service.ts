import { GeneratorRepository, GeneratorService, GeneratorType } from 'apps-generic';
import type { NextFunction, Request, Response } from 'express';
import { Material } from '../../models/material';
import { Measure } from '../../models/measure';
import { format_measure_data } from './format/measures';
import { build_search } from './utils/search';

export class MaterialsService extends GeneratorService {

  static find(type: GeneratorType<Material>) {
    if (!type) {
      throw new Error('type is undefined');
    }

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const search = build_search(req.query || {});
        const items = await GeneratorRepository.find(type, search, { name: 1 });
        res.json(items);
      } catch (err) {
        next(err);
      }
    }
  }

  static pagination_with_measure(type: GeneratorType<Material>, measure_type: GeneratorType<Measure>) {
    if (!type) {
      throw new Error('type is undefined');
    }
    if (!measure_type) {
      throw new Error('measure_type is undefined');
    }

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const search = build_search(req.query || {});
        const items = await GeneratorRepository.pagination(type, search, (req as any).page, (req as any).limit, { name: 1 });
        const result = await format_measure_data(items, measure_type);
        res.json(result);
      } catch (err) {
        next(err);
      }
    }
  }
}
