import type { Application } from 'express';
import type { RouteModule } from 'apps-system';
import { Session } from 'apps-system';

const route: RouteModule = (app: Application): void => {
  app.use('/v1', Session.auth);
};

export = route;
