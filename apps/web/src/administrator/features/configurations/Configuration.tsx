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
import { Area } from 'administrator/models/area.model';

const Configuration = () => {
  const { area } = useSelector((state: any): { area: Area | null } => state.apps);

  const [link, set_link] = useState(null);
  const [links] = useState([
    { _id: '1', label: 'Inicio', icon: 'HomeIcon', uri: `/configuration/detail` },
    { _id: '2', label: 'Areas', icon: 'EditIcon', uri: `/configuration/areas` },
    { _id: '3', label: 'Grupos', icon: 'EditIcon', uri: `/configuration/groups` },
    { _id: '4', label: 'Editar', icon: 'ImageIcon', uri: `/configuration/update` },
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
          <VNavbar link={link} links={links} on_select={on_select} />
          <Flex.Item>
            {area && <Outlet />}
          </Flex.Item>
        </Flex>
      </Flex.Item>
    </Screen>
  );
};

export { Configuration };
