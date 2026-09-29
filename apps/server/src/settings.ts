import config from './config.json';

const enviroment = process.env.NODE_ENV || 'develop';

export default (config as any)[enviroment];
