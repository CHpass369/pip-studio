import { Account } from 'administrator/features/accounts/models/account.model';

export const types = {
  ACCOUNT_LOAD: 'account-load',
  ACCOUNT_SET: 'account-set',
  ACCOUNT_SET_ONE: 'account-set-one',
  ACCOUNT_UPDATE: 'account-update',
  ACCOUNT_REMOVE: 'account-remove',
};

const load = (data: { loading: boolean; account: Account | null }) => ({
  type: types.ACCOUNT_LOAD,
  data,
});

const set = (data: Account) => ({
  type: types.ACCOUNT_SET,
  data,
});

const set_one = (data: Account) => ({
  type: types.ACCOUNT_SET_ONE,
  data,
});

const update = (data: Account) => ({
  type: types.ACCOUNT_UPDATE,
  data,
});

const remove = (data: Account) => ({
  type: types.ACCOUNT_REMOVE,
  data,
});

export default { load, set, set_one, update, remove };
