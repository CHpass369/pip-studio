import { HasAdministrators } from './administrator.model';

export interface Area extends HasAdministrators {
  _id: string;
  name: string;
  description: string;
  image_id: string | null;
  banner_id?: string | null;
  enabled: boolean;
  group_id: string;
}
