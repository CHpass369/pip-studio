import { BASE_PATH } from 'generics/constants';
import { common } from 'generics/services/v4';

const login = (params) => {
  if (!params) {
    throw new Error('params is undefined');
  }

  return common.get_session().post(`${BASE_PATH.ACCOUNTS}/p1/auth/login`, params);
};

const logout = () => (
  common.get_session().delete(`${BASE_PATH.ACCOUNTS}/p1/auth/logout`)
);

export default { login, logout };
