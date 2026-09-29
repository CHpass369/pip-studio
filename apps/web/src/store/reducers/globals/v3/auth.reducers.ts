import { storage } from 'generics/services/v4';

import { types as auth_types } from 'store/actions/globals/v3/auth.actions';
import { types as account_types } from 'store/actions/settings/accounts.actions';
import { Account, AuthSession } from 'administrator/features/accounts/models/account.model';

interface AuthState {
  loading: boolean;
  account: Account | null;
  token: string | null;
}

interface AuthAction {
  type: string;
  data: any;
}

const initialState: AuthState = {
  loading: false,
  account: null,
  token: storage.load('token'),
};

const reducer = (state = initialState, { type, data }: AuthAction) => {
  switch (type) {
  case account_types.ACCOUNT_SET: {
    // const { token } = data;
    const session = data;
    delete session.token;
    storage.save('account', session);
    // storage.save('token', token);
    return {
      ...state,
      account: data,
      // token,
    };
  }
  case account_types.ACCOUNT_LOAD: {
    storage.save('account', data.account);
    return {
      ...state,
      loading: data.loading,
      account: data.account,
    };
  }
  case auth_types.LOGIN: {
    const { token }: AuthSession = data;
    const session = data;
    delete session.token;
    storage.save('account', session);
    storage.save('token', token);
    return {
      ...state,
      account: data,
      token,
    };
  }
  case auth_types.LOGOUT: {
    storage.remove('drawer');
    storage.remove('checkout-config');
    // storage.remove('area');
    storage.remove('account');
    storage.remove('token');
    storage.remove('sales-point');
    return {
      ...state,
      account: null,
      token: null,
    };
  }
  default:
    return state;
  }
};

export default reducer;
