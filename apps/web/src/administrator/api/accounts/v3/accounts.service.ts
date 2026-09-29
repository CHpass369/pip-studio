import { AxiosPromise } from 'axios';
import { BASE_PATH } from 'generics/constants';
import { common } from 'generics/services/v4';
import { Account } from 'administrator/features/accounts/models/account.model';

const PATH_V1 = `${BASE_PATH.ACCOUNTS}/v1/accounts`;
const PATH_P1 = `${BASE_PATH.ACCOUNTS}/p1/accounts`;

const get_by_id = common.get_by_id<Account>(PATH_V1);
const find = common.find<Account>(PATH_V1);
const find_user = common.find<Account>(`${PATH_V1}/find`);
// `current` responds with a single account, not a list, despite reusing the `find` (GET + query params) factory.
const find_current = common.find(`${PATH_V1}/current`) as unknown as (params: Record<string, any>) => AxiosPromise<Account>;
const find_by = common.find_by<Account>(PATH_V1);
const create = common.create<Account>(PATH_P1);
const update = common.update<Account>(PATH_V1);
const remove = common.remove<Account>(PATH_V1);

export default { get_by_id, find, find_user, find_current, find_by, create, update, remove };
