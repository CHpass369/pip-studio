import { BASE_PATH } from 'generics/constants';
import { common } from 'generics/services/v4';
import { Construction } from 'app/models/construction.model';

const PATH_V1 = `${BASE_PATH.APP}/v1/constructions`;

const get_by_id = common.get_by_id<Construction>(PATH_V1);
const find = common.find<Construction>(PATH_V1);
const find_by = common.find_by<Construction>(PATH_V1);
const create = common.create<Construction>(PATH_V1);
const update = common.update<Construction>(PATH_V1);
const remove = common.remove<Construction>(PATH_V1);
const clone = (id: string, data: Partial<Construction>) => common.get_session().post<Construction>(`${PATH_V1}/${id}/clone`, data);

export default {
  get_by_id,
  find,
  find_by,
  create,
  update,
  remove,
  clone,
};
