import { Route } from 'react-router';

import { Area } from 'administrator/models/area.model';

import { InvoicesHistory } from './InvoicesHistory';

const routes = (area: Area) => (
  <Route path="invoices" element={<InvoicesHistory area={area} />} />
);

export { routes };
