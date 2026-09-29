import { BASE_PATH } from 'generics/constants';
import { common } from 'generics/services/v4';

const PATH_V2 = `${BASE_PATH.GUESTS}/v2/control-codes`;

// const get_by_id = common.get_by_id(PATH_V2);
// const find = common.find(PATH_V2);
// const find_by = common.find_by(PATH_V2);
const create = common.create(PATH_V2);
const test = common.create(PATH_V2);
// const update = common.update(PATH_V2);
// const remove = common.remove(PATH_V2);

export default { create, test };
