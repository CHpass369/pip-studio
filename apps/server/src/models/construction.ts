import { Generator } from 'apps-generic';

export class Construction extends Generator {

  area_id?: string;
  name?: string;

  static get db_name(): string {
    return 'constructions';
  }
}
