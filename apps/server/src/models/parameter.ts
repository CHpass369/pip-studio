import { Generator } from 'apps-generic';

export class Parameter extends Generator {

  area_id?: string;
  name?: string;
  parameters?: any[];

  static get db_name(): string {
    return 'parameters';
  }
}
