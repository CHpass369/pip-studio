import { Route } from 'react-router';

import { GENERIC } from 'generics/constants';

import { Cobra } from './Cobra';
import { FeatureRoute as MaterialsRoute } from './console/materials/FeatureRoute';
import { FeatureRoute as MesurementsRoute } from './console/measurements/FeatureRoute';
import { FeatureRoute as ProjectsRoute } from './console/projects/FeatureRoute';
import { FeatureRoute as WorkersRoute } from './console/workers/FeatureRoute';
import { FeatureRoute as ToolsRoute } from './console/tools/FeatureRoute';
import { FeatureRoute as ConstructionsRoute } from './console/constructions/FeatureRoute';
import { FeatureRoute as ParametersRoute } from './console/parameters/FeatureRoute';
import { FeatureRoute as ZonesRoute } from './console/zones/FeatureRoute';
import { FeatureRoute as TutorialsRoute } from './console/tutorials/FeatureRoute';
import { SettingRoutes } from './setting/SettingRoutes';

const routes = () => (
  <>
    <Route path={GENERIC.APP_BASE_URL} element={<Cobra />}>
      {MaterialsRoute()}
      {MesurementsRoute()}
      {ProjectsRoute()}
      {WorkersRoute()}
      {ToolsRoute()}
      {ConstructionsRoute()}
      {ParametersRoute()}
      {ZonesRoute()}
      {TutorialsRoute()}
    </Route>
    {SettingRoutes()}
  </>
);

export { routes };

