import { Generator } from 'apps-generic';

export class Project extends Generator {

  area_id?: string;
  name?: string;
  parameter_id?: string;
  zones?: string[];

  static get db_name(): string {
    return 'projects';
  }
}
