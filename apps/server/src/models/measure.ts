import { Generator } from 'apps-generic';

export class Measure extends Generator {

  area_id?: string;
  name?: string;

  static get db_name(): string {
    return 'measures';
  }
}
