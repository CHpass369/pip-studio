import { BASE_PATH } from 'generics/constants';
import { common } from 'generics/services/v4';
import { Measure } from 'app/models/measure.model';

const PATH_V1 = `${BASE_PATH.APP}/v1/measures`;

const get_by_id = common.get_by_id<Measure>(PATH_V1);
const find = common.find<Measure>(PATH_V1);
const find_by = common.find_by<Measure>(PATH_V1);
const create = common.create<Measure>(PATH_V1);
const update = common.update<Measure>(PATH_V1);
const remove = common.remove<Measure>(PATH_V1);

export default {
  get_by_id,
  find,
  find_by,
  create,
  remove,
  update,
};
