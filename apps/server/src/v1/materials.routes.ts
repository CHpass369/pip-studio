import type { Application } from 'express';
import type { RouteModule } from 'apps-system';
import express from 'express';
import { Material } from '../models/material';
import { Measure } from '../models/measure';
import { MaterialsService } from './services/materials.service';

const route: RouteModule = (app: Application): void => {
  let router = express.Router();

  router.get('/materials', MaterialsService.find(Material));
  router.get(
    '/materials/page/:page/limit/:limit', MaterialsService.pagination_with_measure(Material, Measure)
  );
  router.post('/materials', MaterialsService.create(Material));
  router.route('/materials/:material_id')
  .get(MaterialsService.show(Material))
  .put(MaterialsService.update(Material))
  .delete(MaterialsService.remove(Material));
  router.param('page', MaterialsService.page());
  router.param('limit', MaterialsService.limit());
  router.param('material_id', MaterialsService.load(Material));

  app.use('/v1', router);
};

export = route;
