import type { Application } from 'express';
import type { RouteModule } from 'apps-system';
import express from 'express';
import { Project } from '../models/project';
import { Parameter } from '../models/parameter';
import { ProjectService } from './services/projects.service';

const route: RouteModule = (app: Application): void => {
  let router = express.Router();

  router.get('/projects', ProjectService.find(Project));
  router.get(
    '/projects/page/:page/limit/:limit', ProjectService.pagination_with_parameters(Project, Parameter)
  );
  router.post('/projects', ProjectService.create(Project));
  router.route('/projects/:project_id')
  .get(ProjectService.show_with_parameters(Project, Parameter))
  .put(ProjectService.update(Project))
  .delete(ProjectService.remove(Project));
  router.param('page', ProjectService.page());
  router.param('limit', ProjectService.limit());
  router.param('project_id', ProjectService.load(Project));

  app.use('/v1', router);
};

export = route;
