import { Route } from 'react-router';

import { Settings } from './Settings';

import { SettingDetail } from './setting/SettingDetail';
import { SettingControlCode } from './setting/SettingControlCode';
import { SettingInvoice } from './setting/SettingInvoice';
import { SettingCompany } from './setting/SettingCompany';
import { SettingLogo } from './setting/SettingLogo';
import { SettingOrder } from './setting/SettingOrder';
import { SettingIndexer } from './setting/SettingIndexer';
import { Area } from 'administrator/models/area.model';

const routes = (area: Area | null) => (
  <Route path="settings" element={<Settings area={area as Area} />}>
    <Route path="detail" element={<SettingDetail area={area as Area} />} />
    <Route path="company" element={<SettingCompany area={area as Area} />} />
    <Route path="invoice" element={<SettingInvoice area={area as Area} />} />
    <Route path="code" element={<SettingControlCode area={area as Area} />} />
    <Route path="order" element={<SettingOrder area={area as Area} />} />
    <Route path="indexer" element={<SettingIndexer area={area as Area} />} />
    <Route path="logo" element={<SettingLogo area={area as Area} />} />
  </Route>
);

export { routes };
