import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';

import { BACKGROUND } from 'generics/constants';
import { Screen } from 'components/screens/v2';
import { Session } from 'administrator/features/auth/session/Session';

import { Header } from 'administrator/features/header/Header';
import { Menu } from 'administrator/features/header/Menu';

import { Flex, Container } from 'components/grids/v5';
import { VNavbar } from 'components/headers/v1';
import { MenuOptions } from 'app/MenuOptions';

const Settings = () => {
  const { area } = useSelector((state: any) => state.apps);

  const [link, set_link] = useState<any>(null);
  const [links] = useState([
    { _id: '1', label: 'Parametros Globales', icon: 'EditIcon', uri: `/settings/parameters` },
    { _id: '2', label: 'Otros', icon: 'EditIcon', uri: `/settings/others` },
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
              {area && <Outlet />}
            </Flex.Item>
          </Container>
        </Flex>
      </Flex.Item>
    </Screen>
  );
};



export { Settings };
