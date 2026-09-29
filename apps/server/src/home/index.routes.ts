import type { Application } from 'express';
import type { RouteModule } from 'apps-system';
import express from 'express';
import { Service } from './service';

const route: RouteModule = (app: Application): void => {
  let router = express.Router();
  router.get('/', Service.home);
  app.use('/', router);
};

export = route;
