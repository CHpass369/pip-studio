import { BASE_PATH, GENERIC } from 'generics/constants';
import { common } from 'generics/services/v4';
import { Area } from 'administrator/models/area.model';

const PATH_V1 = `${BASE_PATH.ACCOUNTS}/v2/areas`;
const PATH_V2 = `${BASE_PATH.ACCOUNTS}/v2/groups/areas/${GENERIC.APP_CODE}`;
const PATH_V3 = `${BASE_PATH.ACCOUNTS}/v3/a`;

const get_by_id = common.get_by_id<Area>(PATH_V1);
const find = common.find<Area>(PATH_V2);
const find_by = common.find_by<Area>(PATH_V2);
const create = common.create<Area>(PATH_V2);
const update = common.update<Area>(PATH_V1);
const remove = common.remove<Area>(PATH_V1);
const get_by_code = common.get_by_id<Area>(PATH_V3);

export default { get_by_id, find, find_by, create, remove, update, get_by_code };
