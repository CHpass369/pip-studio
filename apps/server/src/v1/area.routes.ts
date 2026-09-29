import type { Application } from 'express';
import type { RouteModule } from 'apps-system';
import express from 'express';
import { Area } from '../models/area';
import { AreaService } from './services/area.service';

const route: RouteModule = (app: Application): void => {
  let router = express.Router();

  router.get('/areas', AreaService.find(Area));
  router.get(
    '/areas/page/:page/limit/:limit', AreaService.pagination(Area)
  );
  router.post('/areas', AreaService.create(Area));
  router.route('/areas/:area_id')
  .get(AreaService.show(Area))
  .put(AreaService.update(Area))
  .delete(AreaService.remove(Area));
  router.param('page', AreaService.page());
  router.param('limit', AreaService.limit());
  router.param('area_id', AreaService.load(Area));

  app.use('/v1', router);
};

export = route;
