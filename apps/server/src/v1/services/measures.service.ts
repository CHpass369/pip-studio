import { GeneratorRepository, GeneratorService, GeneratorType } from 'apps-generic';
import type { NextFunction, Request, Response } from 'express';
import { Measure } from '../../models/measure';
import { build_search } from './utils/search';

export class MeasureService extends GeneratorService {

  static pagination(type: GeneratorType<Measure>) {
    if (!type) {
      throw new Error('type is undefined');
    }

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const search = build_search(req.query || {});
        const items = await GeneratorRepository.pagination(type, search, (req as any).page, (req as any).limit, { name: 1 });
        res.json(items);
      } catch (err) {
        next(err);
      }
    }
  }
}
