import { HasAdministrators } from './administrator.model';

export interface Group extends HasAdministrators {
  _id: string;
  name: string;
  description: string;
  image_id: string | null;
  enabled: boolean;
  account_id?: string;
}
