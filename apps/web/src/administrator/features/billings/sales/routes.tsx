import { Route } from 'react-router';

import { Area } from 'administrator/models/area.model';

import { SalesHistory } from './SalesHistory';

const routes = (area: Area) => (
  <Route path="sales" element={<SalesHistory area={area} />} />
);

export { routes };
