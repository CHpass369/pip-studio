import { BASE_PATH } from 'generics/constants';
import { common } from 'generics/services/v4';

const PATH_V3 = `${BASE_PATH.BILLINGS}/v3/buys`;

const get_by_id = common.get_by_id(PATH_V3);
const find = common.find(PATH_V3);
const find_by = common.find_by(PATH_V3);
const create = common.create(PATH_V3);
const update = common.update(PATH_V3);
const remove = common.remove(PATH_V3);
const reports = common.find(`${PATH_V3}/reports`);
const terminate = common.find(`${PATH_V3}/terminate`);

export default { get_by_id, find, find_by, create, remove, update, reports, terminate };
