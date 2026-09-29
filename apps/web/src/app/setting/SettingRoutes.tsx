import { Route } from 'react-router';
import { useSelector } from 'react-redux';
import { Settings } from './Settings';

import { SettingParameters } from './setting/SettingParameters';
import { SettingOthers } from './setting/SettingOthers';

const SettingRoutes = () => {
  const { area } = useSelector((state: any) => state.apps);

  return (
    <Route path="/settings" element={<Settings />}>
      <Route path="parameters" element={<SettingParameters area={area} />} />
      <Route path="others" element={<SettingOthers area={area} />} />
    </Route>
  );
};

export { SettingRoutes };
