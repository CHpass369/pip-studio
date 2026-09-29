import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';

import { GENERIC } from 'generics/constants';
import { Header } from 'administrator/features/header/Header';

import './Home.scss';

const Home = () => {
  const navigate = useNavigate();

  const handle_select = () => {
    navigate(GENERIC.APP_BASE_URL);
  };

  return (
    <div className="home-page">
      <Header />

      <div className="home-content">
        <h1 className="home-title">{GENERIC.APP_FULL_NAME}</h1>
        <Button variant="contained" size="large" onClick={handle_select}>
          Mis proyectos
        </Button>
      </div>
    </div>
  );
};

export { Home };
