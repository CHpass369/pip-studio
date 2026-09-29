import type { Application } from 'express';
import type { RouteModule } from 'apps-system';
import express from 'express';
import { Measure } from '../models/measure';
import { MeasureService } from './services/measures.service';

const route: RouteModule = (app: Application): void => {
  let router = express.Router();

  router.get('/measures', MeasureService.find(Measure));
  router.get(
    '/measures/page/:page/limit/:limit', MeasureService.pagination(Measure)
  );
  router.post('/measures', MeasureService.create(Measure));
  router.route('/measures/:measure_id')
  .get(MeasureService.show(Measure))
  .put(MeasureService.update(Measure))
  .delete(MeasureService.remove(Measure));
  router.param('page', MeasureService.page());
  router.param('limit', MeasureService.limit());
  router.param('measure_id', MeasureService.load(Measure));

  app.use('/v1', router);
};

export = route;
