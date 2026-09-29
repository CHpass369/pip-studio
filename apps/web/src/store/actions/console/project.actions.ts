import { Project, ProjectModule, ProjectConstruction } from 'app/models/project.model';
import { Parameter } from 'app/models/parameter.model';

export const types = {
  PROJECT_SET: 'project-set',
  PROJECT_SET_ONE: 'project-set-one',
  PROJECT_UPDATE: 'project-update',
  PROJECT_MODULE_UPDATE: 'project-module-update',
  PROJECT_REMOVE: 'project-remove',
  PROJECT_REPLACE: 'project-replace',
  PROJECT_MODULE_NEW: 'project-new-module',
  PROJECT_MODULE_EVENT: 'project-module-event',
  PROJECT_NEW_CONSTRUCTION: 'project-new-construction',
  PROJECT_UPDATE_CONSTRUCTION: 'project-update-construction',
  PROJECT_CONSTRUCTION_EVENT: 'project-construction-event',
  PROJECT_UPDATE_PARAMETERS: 'project-update-parameters',
};

export type MoveEvent = 'arrowdown' | 'arrowup' | 'remove';

// const set = (data) => ({
//   type: types.PROJECT_SET,
//   data,
// });

// const set_one = (data) => ({
//   type: types.PROJECT_SET_ONE,
//   data,
// });

const update = (data: Partial<Project>) => ({
  type: types.PROJECT_UPDATE,
  data,
});

// const remove = (data) => ({
//   type: types.PROJECT_REMOVE,
//   data,
// });

const set_project = (data: Project) => ({
  type: types.PROJECT_REPLACE,
  data,
});

const module_update = (_id: string | null = null, value: Partial<ProjectModule>) => ({
  type: types.PROJECT_MODULE_UPDATE,
  data: { _id, value },
});

const module_new = (data: ProjectModule) => ({
  type: types.PROJECT_MODULE_NEW,
  data,
});

const module_event = (_id: string | null = null, value: { type: MoveEvent }) => ({
  type: types.PROJECT_MODULE_EVENT,
  data: { _id, value },
});

const new_construction = (_id: string | null = null, value: ProjectConstruction) => ({
  type: types.PROJECT_NEW_CONSTRUCTION,
  data: { _id, value },
});

const update_construction = (_id: string | null = null, value: Partial<ProjectConstruction>) => ({
  type: types.PROJECT_UPDATE_CONSTRUCTION,
  data: { _id, value },
});

const construction_event = (_id: string | null = null, value: { _id: string; type: MoveEvent }) => ({
  type: types.PROJECT_CONSTRUCTION_EVENT,
  data: { _id, value },
});

const update_parameters = (data: Parameter) => ({
  type: types.PROJECT_UPDATE_PARAMETERS,
  data,
});

export default { update, set_project, module_update, module_new, module_event, new_construction, update_construction, construction_event, update_parameters };
