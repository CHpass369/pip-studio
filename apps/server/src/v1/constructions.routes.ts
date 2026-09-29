import type { Application } from 'express';
import type { RouteModule } from 'apps-system';
import express from 'express';
import { Construction } from '../models/construction';
import { ConstructionService } from './services/constructions.service';

const route: RouteModule = (app: Application): void => {
  let router = express.Router();

  router.get('/constructions', ConstructionService.find(Construction));
  router.get(
    '/constructions/page/:page/limit/:limit', ConstructionService.pagination(Construction)
  );
  router.post('/constructions', ConstructionService.create(Construction));
  router.route('/constructions/:construction_id')
  .get(ConstructionService.show(Construction))
  .put(ConstructionService.update(Construction))
  .delete(ConstructionService.remove(Construction));
  router.param('page', ConstructionService.page());
  router.param('limit', ConstructionService.limit());
  router.param('construction_id', ConstructionService.load(Construction));

  app.use('/v1', router);
};

export = route;
