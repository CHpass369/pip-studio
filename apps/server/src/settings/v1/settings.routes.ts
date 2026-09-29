import type { Application } from 'express';
import type { RouteModule } from 'apps-system';
import express from 'express';
import { Setting } from '../models/setting';
import { SettingService } from './services/setting.service';

const route: RouteModule = (app: Application): void => {
  let router = express.Router();

  router.route('/settings/:_id')
  .get(SettingService.show_or_create(Setting))
  .put(SettingService.update(Setting));

  router.route('/settings/:setting_id')
  .delete(SettingService.remove(Setting));

  router.param('setting_id', SettingService.load(Setting));

  app.use('/v1', router);
};

export = route;
