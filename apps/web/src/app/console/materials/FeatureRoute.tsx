import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import { Area } from 'administrator/models/area.model';

import { GItem } from './items/GItem';
import { GItems } from './items/GItems';
import { Layout } from './Layout';

const FeatureRoute = () => {
  const { area } = useSelector((state: any): { area: Area } => state.apps);

  return (
    <Route path="materials" element={<Layout />}>
      <Route index={true} element={<GItems area={area} />} />
      <Route path="new" element={<GItem area={area} />} />
      <Route path=":_id" element={<GItem area={area} />} />
    </Route>
  );
};

export { FeatureRoute };
