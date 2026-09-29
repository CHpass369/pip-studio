import { name, version } from '../../package.json';

const uptime = new Date();

export class Service {

  static home(req: any, res: any, next: any) {
    res.json({
      name,
      version,
      uptime,
    });
  }
}
