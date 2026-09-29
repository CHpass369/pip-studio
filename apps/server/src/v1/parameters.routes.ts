import type { Application } from 'express';
import type { RouteModule } from 'apps-system';
import express from 'express';
import { Parameter } from '../models/parameter';
import { ParameterService } from './services/parameters.service';

const route: RouteModule = (app: Application): void => {
  let router = express.Router();

  router.get('/parameters', ParameterService.find(Parameter));
  router.get(
    '/parameters/page/:page/limit/:limit', ParameterService.pagination(Parameter)
  );
  router.post('/parameters', ParameterService.create(Parameter));
  router.route('/parameters/:parameter_id')
  .get(ParameterService.show(Parameter))
  .put(ParameterService.update(Parameter))
  .delete(ParameterService.remove(Parameter));
  router.param('page', ParameterService.page());
  router.param('limit', ParameterService.limit());
  router.param('parameter_id', ParameterService.load(Parameter));

  app.use('/v1', router);
};

export = route;
