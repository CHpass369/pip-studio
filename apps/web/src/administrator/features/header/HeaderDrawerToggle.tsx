import { useSelector } from 'react-redux';

import { DrawerToggle } from './DrawerToggle';
import { HToolbarButton } from './container/HToolbarContainer';

const HeaderDrawerToggle = () => {
  const { visible } = useSelector((state: any) => state.drawer);

  if (visible) {
    return null;
  }

  return (
    <HToolbarButton>
      <DrawerToggle />
    </HToolbarButton>
  );
};

export { HeaderDrawerToggle };
