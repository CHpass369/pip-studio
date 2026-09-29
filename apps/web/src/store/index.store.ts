import { configureStore, combineReducers } from '@reduxjs/toolkit';

import apps from './reducers/globals/v3/apps.reducers';
import areas from './reducers/globals/v3/areas.reducers';
import auth from './reducers/globals/v3/auth.reducers';
import groups from './reducers/settings/groups.reducers';
import settings from './reducers/settings/settings.reducers';

import drawer from './slices/global/drawer.slice';
import grid from './slices/global/grid.slice';
import loading from './slices/global/loading.slice';
import menu from './slices/global/menu.slice';

import app from './reducers/console/app.reducers';
import project from './reducers/console/project.reducers';
import project_assets from './slices/project.slice';

const reducer = combineReducers({
  apps,
  areas,
  auth,
  groups,
  settings,
  loading,

  app,
  project,
  project_assets,

  drawer,
  menu,
  grid,
});

const store = configureStore({ reducer });

export { store };
