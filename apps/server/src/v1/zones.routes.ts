import type { Application } from 'express';
import type { RouteModule } from 'apps-system';
import express from 'express';
import { Zone } from '../models/zone';
import { ZoneService } from './services/zones.service';

const route: RouteModule = (app: Application): void => {
  let router = express.Router();

  router.get('/zones', ZoneService.find(Zone));
  router.get(
    '/zones/page/:page/limit/:limit', ZoneService.pagination(Zone)
  );
  router.post('/zones', ZoneService.create(Zone));
  router.route('/zones/:zone_id')
  .get(ZoneService.show(Zone))
  .put(ZoneService.update(Zone))
  .delete(ZoneService.remove(Zone));
  router.param('page', ZoneService.page());
  router.param('limit', ZoneService.limit());
  router.param('zone_id', ZoneService.load(Zone));

  app.use('/v1', router);
};

export = route;
