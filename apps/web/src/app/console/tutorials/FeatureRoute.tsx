import { Route } from 'react-router';

import { GItems } from './items/GItems';
import { Layout } from './Layout';

const FeatureRoute = () => (
  <Route path="tutorials" element={<Layout />}>
    <Route index={true} element={<GItems />} />
  </Route>
);

export { FeatureRoute };
