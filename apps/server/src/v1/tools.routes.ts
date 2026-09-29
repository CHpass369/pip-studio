import type { Application } from 'express';
import type { RouteModule } from 'apps-system';
import express from 'express';
import { Tool } from '../models/tool';
import { Measure } from '../models/measure';
import { ToolsService } from './services/tools.service';

const route: RouteModule = (app: Application): void => {
  let router = express.Router();

  router.get('/tools', ToolsService.find(Tool));
  router.get(
    '/tools/page/:page/limit/:limit', ToolsService.pagination_with_measure(Tool, Measure)
  );
  router.post('/tools', ToolsService.create(Tool));
  router.route('/tools/:tool_id')
  .get(ToolsService.show(Tool))
  .put(ToolsService.update(Tool))
  .delete(ToolsService.remove(Tool));
  router.param('page', ToolsService.page());
  router.param('limit', ToolsService.limit());
  router.param('tool_id', ToolsService.load(Tool));

  app.use('/v1', router);
};

export = route;
