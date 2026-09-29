import { BASE_PATH } from 'generics/constants';
import { common } from 'generics/services/v4';

const PATH_V2 = `${BASE_PATH.BILLINGS}/v2/sales`;
const PATH_V3 = `${BASE_PATH.BILLINGS}/v3/sales`;

const get_by_id = common.get_by_id(PATH_V2);
const find = common.find(PATH_V2);
const find_by = common.find_by(PATH_V2);
const create = common.create(PATH_V2);
const update = common.update(PATH_V2);
const remove = common.remove(PATH_V2);
const reports = common.find(`${PATH_V3}/reports`);

const find_daily_total = (params) => (
  common.get_session().get(
    `${PATH_V2}/daily`, { params },
  )
);
const complete = (_id, payload) => (
  common.get_session().put(`${PATH_V2}/${_id}/complete`, payload)
);
const send_email = (_id, payload) => (
  common.get_session().post(`${PATH_V2}/${_id}/notifications/email`, payload)
);

export default {
  get_by_id,
  find,
  find_by,
  find_daily_total,
  create,
  remove,
  update,
  reports,
  complete,
  send_email,
};
