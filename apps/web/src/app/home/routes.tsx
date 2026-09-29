import { Route } from 'react-router';

import { Home } from './Home';

const routes = () => (
  <Route path="/" element={<Home />} />
);

export { routes };
