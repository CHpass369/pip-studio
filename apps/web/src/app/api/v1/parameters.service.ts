import { BASE_PATH } from 'generics/constants';
import { common } from 'generics/services/v4';
import { ParameterSet } from 'app/models/parameter.model';

const PATH_V1 = `${BASE_PATH.APP}/v1/parameters`;

const get_by_id = common.get_by_id<ParameterSet>(PATH_V1);
const find = common.find<ParameterSet>(PATH_V1);
const find_by = common.find_by<ParameterSet>(PATH_V1);
const create = common.create<ParameterSet>(PATH_V1);
const update = common.update<ParameterSet>(PATH_V1);
const remove = common.remove<ParameterSet>(PATH_V1);

export default {
  get_by_id,
  find,
  find_by,
  create,
  remove,
  update,
};
