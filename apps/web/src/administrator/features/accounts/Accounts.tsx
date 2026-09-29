import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';

import { BACKGROUND } from 'generics/constants';
import { Screen } from 'components/screens/v2';
import { Session } from 'administrator/features/auth/session/Session';

import { Header } from '../header/Header';
import { Menu } from '../header/Menu';
import { MenuOptions } from '../../../app/MenuOptions';

import { Flex, Container } from 'components/grids/v5';
import { VNavbar } from 'components/headers/v1';
import { Account } from './models/account.model';

const Accounts = () => {
  const { account } = useSelector((state: any): { account: Account | null } => state.auth);

  const [link, set_link] = useState(null);
  const [links] = useState([
    { _id: '1', label: 'Cuenta', icon: 'HomeIcon', uri: `/accounts/detail` },
    { _id: '2', label: 'Editar', icon: 'EditIcon', uri: `/accounts/update` },
  ]);

  const on_select = useCallback((data: any) => {
    set_link(data);
  }, []);

  return (
    <Screen background={BACKGROUND}>
      <Session />
      <Menu />
      <MenuOptions />
      <Flex.Item>
        <Flex>
          <Header />
          <Container width="1200px">
            <VNavbar link={link} links={links} on_select={on_select} />
            <Flex.Item>
              {account && <Outlet />}
            </Flex.Item>
          </Container>
        </Flex>
      </Flex.Item>
    </Screen>
  );
};

export { Accounts };
