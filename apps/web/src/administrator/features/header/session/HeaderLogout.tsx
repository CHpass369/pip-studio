import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import Button from '@mui/material/Button';
import { HToolbarButton, HToolbarTitle, HToolbarFlex } from '../container/HToolbarContainer';
import logo from '../../../../assets/images/logo.png';

const HeaderLogout = () => {
  const navigate = useNavigate();

  const on_home = () => {
    navigate('/');
  };

  const on_register = () => {
    navigate('/register');
  };

  const on_login = () => {
    navigate('/login');
  };

  return (
    <>
      <HToolbarTitle>
        <img className="h-toolbar-logo" src={logo} alt="Un Boliviano" aria-hidden="true" onClick={on_home} />
      </HToolbarTitle>
      <HToolbarFlex />
      <HToolbarButton>
        <Button variant="outlined" onClick={on_register}>Uneté</Button>
        <Button variant="contained" onClick={on_login}>Iniciar session</Button>
      </HToolbarButton>
    </>
  );
};

export { HeaderLogout };
