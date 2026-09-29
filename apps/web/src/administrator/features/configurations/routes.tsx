import { Route } from 'react-router';

import { Configuration } from './Configuration';

import { HomeArea } from './areas/HomeArea';
import { HomeAreaUpdate } from './areas/HomeAreaUpdate';
import { Areas } from './areas/Areas';
import { AreaDetail } from './areas/AreaDetail';
import { AreaUpdate } from './areas/AreaUpdate';
import { AreaGroups } from './groups/AreaGroups';
import { AreaGroupDetail } from './groups/AreaGroupDetail';
import { AreaGroupUpdate } from './groups/AreaGroupUpdate';
import { Area } from 'administrator/models/area.model';

const routes = (area: Area | null) => (
  <Route path="configuration" element={<Configuration />}>
    <Route path="detail" element={<HomeArea area={area as Area} />} />
    <Route path="areas" element={<Areas area={area as Area} />} />
    <Route path="areas/:area_id" element={<AreaDetail />} />
    <Route path="areas/:area_id/update" element={<AreaUpdate />} />
    <Route path="groups" element={<AreaGroups area={area as Area} />} />
    <Route path="groups/:group_id" element={<AreaGroupDetail />} />
    <Route path="groups/:group_id/update" element={<AreaGroupUpdate />} />
    <Route path="update" element={<HomeAreaUpdate area={area as Area} />} />
  </Route>
);

export { routes };
