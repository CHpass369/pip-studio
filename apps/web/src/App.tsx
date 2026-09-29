import { useSelector } from 'react-redux';
import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Dimmer } from 'components/elements/v2';
import { Screen } from 'components/screens/v2';
import { BACKGROUND } from 'generics/constants';

import { Area } from './administrator/models/area.model';
import { Account } from './administrator/features/auth/session/Account';

import { routes as auth_routes } from './administrator/features/auth/routes';
import { routes as home_routes } from './app/home/routes';
import { routes as constructor_routes } from './app/routes';

import { routes as account_routes } from './administrator/features/accounts/routes';
import { routes as setting_routes } from './administrator/features/settings/routes';
import { routes as configuration_routes } from './administrator/features/configurations/routes';

import 'moment/locale/es';

const App = () => {
  const { area } = useSelector((state: any): { area: Area | null } => state.apps);
  const { loading } = useSelector((state: any) => state.loading);

  return (
    <Screen background={BACKGROUND}>
      <Toaster />
      <Account />
      <Dimmer active={loading}>
        <BrowserRouter>
          <Routes>
            {constructor_routes()}
            {auth_routes()}
            {home_routes()}
            {account_routes()}
            {setting_routes(area)}
            {configuration_routes(area)}
          </Routes>
        </BrowserRouter>
      </Dimmer>
    </Screen>
  );
};

export default App;
