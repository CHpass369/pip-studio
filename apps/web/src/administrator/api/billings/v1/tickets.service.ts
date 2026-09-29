import { BASE_PATH } from 'generics/constants';
import { common } from 'generics/services/v4';

const PATH_V1 = `${BASE_PATH.BILLINGS}/v1/orders`;

const get_by_id = common.get_by_id(PATH_V1);
const find = common.find(PATH_V1);
const find_by = common.find_by(PATH_V1);
const create = common.create(PATH_V1);
const update = common.update(PATH_V1);
const remove = common.remove(PATH_V1);

export default { get_by_id, find, find_by, create, remove, update };
