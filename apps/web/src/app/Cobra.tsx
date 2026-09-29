import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';

import { BACKGROUND } from 'generics/constants';
import { Screen } from 'components/screens/v2';
import { Flex } from 'components/grids/v5';
import { Session } from 'administrator/features/auth/session/Session';

import { Header } from 'administrator/features/header/Header';
import { Menu } from 'administrator/features/header/Menu';
import { MenuOptions } from './MenuOptions';

const Cobra = () => {
  const { area } = useSelector((state: any) => state.apps);

  return (
    <Screen background={BACKGROUND}>
      <Session />
      <Menu />
      <MenuOptions />
      <Flex.Item>
        <Flex>
          <Header />
          <Flex.Item>
            {area && <Outlet />}
          </Flex.Item>
        </Flex>
      </Flex.Item>
    </Screen>
  );
};

export { Cobra };
