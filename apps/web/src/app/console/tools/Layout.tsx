import { Outlet } from 'react-router';
import { Flex } from 'components/grids/v5';

const Layout = () => (
  <Flex>
    <Outlet />
  </Flex>
);

export { Layout };
