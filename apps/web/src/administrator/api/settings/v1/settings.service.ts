import { BASE_PATH } from 'generics/constants';
import { common } from 'generics/services/v4';
import { Setting } from 'administrator/features/settings/models/setting.model';

const PATH_V2 = `${BASE_PATH.ACCOUNTS}/v2/settings`;

const get_by_id = common.get_by_id<Setting>(PATH_V2);
const find = common.find<Setting>(PATH_V2);
const find_by = common.find_by<Setting>(PATH_V2);
const create = common.create<Setting>(PATH_V2);
const update = common.update<Setting>(PATH_V2);
const remove = common.remove<Setting>(PATH_V2);

export default { get_by_id, find, find_by, create, remove, update };
