import { BASE_PATH } from 'generics/constants';
import { common } from 'generics/services/v4';

const PATH = `${BASE_PATH.BILLINGS}/v2/orders`;

const get_by_id = common.get_by_id(PATH);
const find = common.find(PATH);
const find_by = common.find_by(PATH);
const create = common.create(PATH);
const update = common.update(PATH);
const remove = common.remove(PATH);

const report = common.find(`${PATH}/reports`);
const checkout = (_id, payload) => (
  common.get_session().put(`${PATH}/${_id}/checkout`, payload)
);

export default { get_by_id, find, find_by, create, remove, update, report, checkout };
