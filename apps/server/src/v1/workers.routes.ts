import type { Application } from 'express';
import type { RouteModule } from 'apps-system';
import express from 'express';
import { Worker } from '../models/worker';
import { Measure } from '../models/measure';
import { WorkersService } from './services/workers.service';

const route: RouteModule = (app: Application): void => {
  let router = express.Router();

  router.get('/workers', WorkersService.find(Worker));
  router.get(
    '/workers/page/:page/limit/:limit', WorkersService.pagination_with_measure(Worker, Measure)
  );
  router.post('/workers', WorkersService.create(Worker));
  router.route('/workers/:worker_id')
  .get(WorkersService.show(Worker))
  .put(WorkersService.update(Worker))
  .delete(WorkersService.remove(Worker));
  router.param('page', WorkersService.page());
  router.param('limit', WorkersService.limit());
  router.param('worker_id', WorkersService.load(Worker));

  app.use('/v1', router);
};

export = route;
