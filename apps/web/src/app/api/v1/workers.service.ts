import { BASE_PATH } from 'generics/constants';
import { common } from 'generics/services/v4';
import { Resource } from 'app/models/resource.model';

const PATH_V1 = `${BASE_PATH.APP}/v1/workers`;

const get_by_id = common.get_by_id<Resource>(PATH_V1);
const find = common.find<Resource>(PATH_V1);
const find_by = common.find_by<Resource>(PATH_V1);
const create = common.create<Resource>(PATH_V1);
const update = common.update<Resource>(PATH_V1);
const remove = common.remove<Resource>(PATH_V1);

export default {
  get_by_id,
  find,
  find_by,
  create,
  remove,
  update,
};
