import log4js from 'log4js';

import { app, System } from 'apps-system';
import { Logger } from 'apps-logger';
import { Mongo } from 'apps-generic';
import { Mqtt } from 'apps-mqtt';
import { share_assets } from './components/system';
import settings from './settings';

let logger = log4js.getLogger('app');

(async () => {
  try {
    const slogger = new Logger();
    slogger.start();
    const sapp = share_assets(app);
    const mongo = new Mongo(settings.mongo);
    await mongo.start();
    const system = new System(sapp, mongo.db, settings);
    await system.load_routes(__dirname);
    await system.start();
    // const mqtt = new Mqtt(settings.mqtt);
    // mqtt.start();
    logger.info('server started at port: ' + system.port);
  } catch(err) {
    logger.error(err);
  }
})();
