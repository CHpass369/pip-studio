import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import api from 'administrator/api/accounts/v3';
import setting_actions from 'store/actions/settings';
import { toast, storage } from 'generics/services/v4';

const Account = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = storage.load('token');
    if (!token) {
      dispatch(setting_actions.accounts.load({ loading: true, account: null }));
      return;
    }

    api.accounts.find_current({})
    .then(({ data }) => {
      dispatch(setting_actions.accounts.load({ loading: true, account: data }));
    })
    .catch(toast.api_danger);
    // .catch(() => {
    //   dispatch(setting_actions.accounts.load({ loading: true, account: null }));
    // });
  }, [dispatch]);

  return null;
};

export { Account };
