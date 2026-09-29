import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';

import { toggle_drawer } from 'store/slices/global/drawer.slice';

const DrawerToggle = () => {
  const dispatch = useDispatch();

  const on_toggle = () => {
    dispatch(toggle_drawer());
  };

  return (
    <IconButton aria-label="Menu" onClick={on_toggle}>
      <ListIcon fontSize="large" />
    </IconButton>
  );
};

export { DrawerToggle };
