import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Flex } from 'components/grids/v5';
import { GroupCreateModal } from './modals/GroupCreateModal';
import { MenuList, WButton } from 'components/forms/v3';
import { HFlex } from 'components';
import { DrawerToggle } from './DrawerToggle';

import './Menu.scss';

const DRAWER_SIZE = 250;

const Menu = () => {
  const { account } = useSelector((state: any) => state.auth);
  const { area } = useSelector((state: any) => state.apps);
  const { areas } = useSelector((state: any) => state.areas);
  const { visible } = useSelector((state: any) => state.drawer);
  const { session_option, main_option, administration_option } = useSelector((state: any) => state.menu);
  const [open, set_open] = useState(false);

  const render_create_organization = () => (
    <div className="administrator-create-content">
      <WButton label="Crear organización" on_click={() => set_open(true)} />
      <GroupCreateModal open={open} set_open={set_open} />
    </div>
  );

  if (!visible) {
    return null;
  }

  return (
    <HFlex size={DRAWER_SIZE} only={['mobile', 'computer', 'screen']}>
      <Flex direction={Flex.V}>
        <Flex.Scrap>
          <DrawerToggle />
          {account && <MenuList links={session_option} />}

          {(account && !areas.length) && render_create_organization()}
          {area && <h3 className="administrator-title">{area.name}</h3>}
          {area && <MenuList links={main_option} />}

          <h3 className="administrator-title">Administración</h3>
          {area && <MenuList links={administration_option} />}
        </Flex.Scrap>
      </Flex>
    </HFlex>
  );
};

export { Menu };
