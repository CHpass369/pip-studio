import { BASE_PATH } from 'generics/constants';
import { common } from 'generics/services/v4';
import { Customer } from 'app/models/customer.model';

const PATH_V2 = `${BASE_PATH.ACCOUNTS}/v2/customers`;

const get_by_id = common.get_by_id<Customer>(PATH_V2);
const find = common.find<Customer>(PATH_V2);
const find_by = common.find_by<Customer>(PATH_V2);
const remove = common.remove<Customer>(PATH_V2);

const update = (params: Partial<Customer>) => {
  if (!params) {
    throw new Error('params is undefined');
  }

  return common.get_session().put(PATH_V2, params);
};

export default { get_by_id, find, find_by, update, remove };
