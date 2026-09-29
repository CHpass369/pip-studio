import { Generator } from 'apps-generic';

export class Material extends Generator {

  area_id?: string;
  name?: string;
  measure_id?: string;

  static get db_name(): string {
    return 'materials';
  }
}
