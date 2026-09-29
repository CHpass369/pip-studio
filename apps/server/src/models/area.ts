import { Generator } from 'apps-generic';

export class Area extends Generator {

  name?: string;

  static get db_name(): string {
    return 'areas';
  }
}
