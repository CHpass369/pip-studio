import { Route } from 'react-router';
import { useSelector } from 'react-redux';

import { Accounts } from './Accounts';

import { AccountDetail } from './account/AccountDetail';
import { AccountUpdate } from './account/AccountUpdate';
import { Account } from './models/account.model';

const routes = () => {
  const { account } = useSelector((state: any): { account: Account | null } => state.auth);

  return (
    <Route path="accounts" element={<Accounts />}>
      <Route path="detail" element={<AccountDetail account={account as Account} />} />
      <Route path="update" element={<AccountUpdate account={account as Account} />} />
    </Route>
  );
};

export { routes };
