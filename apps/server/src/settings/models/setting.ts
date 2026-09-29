import { Generator } from 'apps-generic';

export class Setting extends Generator {

  static get db_name(): string {
    return 'settings';
  }
}
