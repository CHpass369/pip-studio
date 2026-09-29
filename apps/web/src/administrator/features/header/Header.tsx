import React from 'react';
import { useSelector } from 'react-redux';

import { HeaderLogin } from './session/HeaderLogin';
import { HeaderLogout } from './session/HeaderLogout';
import { HeaderDrawerToggle } from './HeaderDrawerToggle';
import { HSessionContainer } from './container/HToolbarContainer';

const Header = () => {
  const { account } = useSelector((state: any) => state.auth);

  return (
    <HSessionContainer>
      <HeaderDrawerToggle />
      {account ? <HeaderLogin /> : <HeaderLogout />}
    </HSessionContainer>
  );
};

export { Header };
