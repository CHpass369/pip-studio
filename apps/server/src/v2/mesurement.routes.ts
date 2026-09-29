import type { Application } from 'express';
import type { RouteModule } from 'apps-system';
import express from 'express';
import { Area } from '../models/area';
import { MesurementService } from './services/mesurements.service';

const route: RouteModule = (app: Application): void => {
  let router = express.Router();

  router.get('/mesurements', MesurementService.find(Area));
  router.get(
    '/mesurements/page/:page/limit/:limit', MesurementService.pagination(Area)
  );
  router.post('/mesurements', MesurementService.create(Area));
  router.route('/mesurements/:area_id')
  .get(MesurementService.show(Area))
  .put(MesurementService.update(Area))
  .delete(MesurementService.remove(Area));
  router.param('page', MesurementService.page());
  router.param('limit', MesurementService.limit());
  router.param('area_id', MesurementService.load(Area));

  app.use('/v1', router);
};

export = route;
