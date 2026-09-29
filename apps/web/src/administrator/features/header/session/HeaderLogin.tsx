import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import actions from 'store/actions/globals/v3';

import Button from '@mui/material/Button';
import { HToolbarButton, HToolbarTitle, HToolbarFlex } from '../container/HToolbarContainer';
import { AreaSelector } from '../AreaSelector';
import image from '../../../../assets/images/hardcode/male_user.jpeg';
import logo from '../../../../assets/images/logo.png';

import './HeaderLogin.scss';

const HeaderLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account } = useSelector((state: any) => state.auth);

  const on_click = () => {
    navigate('/accounts/detail');
  };

  const on_home = () => {
    navigate('/');
  };

  const on_logout = () => {
    navigate('/');
    dispatch(actions.auth.logout());
  };

  return (
    <>
      <HToolbarTitle>
        <img className="h-toolbar-logo" src={logo} alt="Un Boliviano" aria-hidden="true" onClick={on_home} />
      </HToolbarTitle>
      <HToolbarFlex />
      <HToolbarButton>
        <AreaSelector />
      </HToolbarButton>
      <HToolbarButton>
        <div className="login-information" onClick={on_click}>
          <div>
            <img src={account.image || image} alt={account.name} />
          </div>
          <div>
            <h4>{account.name || account.email}</h4>
          </div>
        </div>
      </HToolbarButton>
      <HToolbarButton>
        <Button variant="contained" onClick={on_logout}>Cerrar session</Button>
      </HToolbarButton>
    </>
  );
};

export { HeaderLogin };
