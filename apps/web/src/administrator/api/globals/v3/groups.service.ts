import { BASE_PATH, GENERIC } from 'generics/constants';
import { common } from 'generics/services/v4';
import { Group } from 'administrator/models/group.model';

const DEFAULT_PATH_V2 = `${BASE_PATH.ACCOUNTS}/v2/groups`;
const GET_PATH_V2 = `${BASE_PATH.ACCOUNTS}/v2/apps/groups`;
const PATH_V2 = `${BASE_PATH.ACCOUNTS}/v2/apps/groups/${GENERIC.APP_CODE}`;

const get_by_id = common.get_by_id<Group>(DEFAULT_PATH_V2);
const find = common.find<Group>(GET_PATH_V2);
const find_by = common.find_by<Group>(PATH_V2);
const create = common.create<Group>(PATH_V2);
const update = common.update<Group>(DEFAULT_PATH_V2);
const remove = common.remove<Group>(DEFAULT_PATH_V2);

export default { get_by_id, find, find_by, create, remove, update };
