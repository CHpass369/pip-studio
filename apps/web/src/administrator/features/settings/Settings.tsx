import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
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

interface SettingsProps {
  area: Area;
}

const Settings = ({ area }: SettingsProps) => {
  const [link, set_link] = useState(null);
  const [links] = useState([
    { _id: '1', label: 'Información', icon: 'home', uri: 'detail' },
    { _id: '2', label: 'Empresa', icon: 'edit', uri: 'company' },
    { _id: '3', label: 'Factura', icon: 'edit', uri: 'invoice' },
    { _id: '4', label: 'Control code', icon: 'edit', uri: 'code' },
    { _id: '5', label: 'Ordenes', icon: 'edit', uri: 'order' },
    { _id: '6', label: 'Numeración', icon: 'edit', uri: 'indexer' },
    { _id: '7', label: 'Editar', icon: 'edit', uri: 'logo' },
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

Settings.propTypes = {
  area: PropTypes.any.isRequired,
};

export { Settings };