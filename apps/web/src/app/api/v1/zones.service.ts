import { BASE_PATH } from 'generics/constants';
import { common } from 'generics/services/v4';
import { Zone } from 'app/models/zone.model';

const PATH_V1 = `${BASE_PATH.APP}/v1/zones`;

const get_by_id = common.get_by_id<Zone>(PATH_V1);
const find = common.find<Zone>(PATH_V1);
const find_by = common.find_by<Zone>(PATH_V1);
const create = common.create<Zone>(PATH_V1);
const update = common.update<Zone>(PATH_V1);
const remove = common.remove<Zone>(PATH_V1);

export default {
  get_by_id,
  find,
  find_by,
  create,
  remove,
  update,
};
