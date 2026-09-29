import { AuthSession } from 'administrator/features/accounts/models/account.model';

export const types = {
  LOGIN: 'login',
  LOGOUT: 'logout',
};

const logout = (data?: any) => ({
  type: types.LOGOUT,
  data,
});

const login = (data: AuthSession) => ({
  type: types.LOGIN,
  data,
});

export default { login, logout };
