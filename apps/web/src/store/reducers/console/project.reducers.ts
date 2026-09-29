import { types } from 'store/actions/console/project.actions';
import api from 'app/api/v1';
import { toast, storage } from 'generics/services/v4';
import { Project, ProjectModule, LockedBy } from 'app/models/project.model';

// the store starts with an empty project until one is loaded
type ProjectState = Pick<Project, 'modules' | 'parameters'> & Partial<Project>;

interface ProjectAction {
  type: string;
  data: any;
}

const initial_state: ProjectState = {
  modules: [],
  parameters: [],
};

const update = (_id: string | undefined, data: Partial<Project>) => {
  api.projects.update(_id as string, data)
  .then(() => {
    console.log('se actualizo correctamente');
    // toast.success('se actualizo correctamente');
  })
  .catch(toast.api_danger);
};

const can_modify_entity = (entity?: { is_lock?: boolean; locked_by?: LockedBy | null } | null) => {
  if (!entity || !entity.is_lock) return true;
  const account = storage.load('account');
  return !!(account && entity.locked_by && account._id === entity.locked_by._id);
};

const notify_locked = (entity: { locked_by?: LockedBy | null } | undefined, label: string) => {
  const locked_by_name = entity?.locked_by?.username || 'otro usuario';
  toast.danger(`Este ${label} esta bloqueado por ${locked_by_name}`);
};

const get_locked_by = () => {
  const account = storage.load('account');
  if (!account) return null;
  return { username: account.username, _id: account._id };
};

const guard_project = (state: ProjectState) => {
  if (can_modify_entity(state)) return null;
  notify_locked(state, 'proyecto');
  return state;
};

const guard_module = (state: ProjectState, module: ProjectModule | undefined) => {
  const project_blocked = guard_project(state);
  if (project_blocked) return project_blocked;
  if (can_modify_entity(module)) return null;
  notify_locked(module, 'modulo');
  return state;
};

const reducer = (state = initial_state, { type, data }: ProjectAction): ProjectState => {
  switch (type) {
  // case types.PROJECT_SET: {
  //   return { ...state, modules: [...data] };
  // }
  // case types.PROJECT_SET_ONE: {
  //   return { ...state, modules: [data, ...state.modules] };
  // }
  case types.PROJECT_UPDATE: {
    const blocked = guard_project(state);
    if (blocked) return blocked;

    const value = { ...data };
    if (Object.prototype.hasOwnProperty.call(value, 'is_lock')) {
      value.locked_by = value.is_lock ? get_locked_by() : null;
    }
    update(state._id, value);
    return { ...state, ...value };
  }
  // case types.PROJECT_REMOVE: {
  //   const modules = state.modules.filter((item) => item._id !== data._id);
  //   return { ...state, modules };
  // }
  case types.PROJECT_REPLACE: {
    return { ...data };
  }
  case types.PROJECT_MODULE_UPDATE: {
    const target = state.modules.find((item) => item._id === data._id);
    const blocked = guard_module(state, target);
    if (blocked) return blocked;

    const value = { ...data.value };
    if (Object.prototype.hasOwnProperty.call(value, 'is_lock')) {
      value.locked_by = value.is_lock ? get_locked_by() : null;
    }
    const modules = state.modules.map((item) => (item._id === data._id ? { ...item, ...value } : item));
    update(state._id, { modules });
    return { ...state, modules };
  }
  case types.PROJECT_MODULE_NEW: {
    const blocked = guard_project(state);
    if (blocked) return blocked;

    const modules = [...state.modules, data];
    update(state._id, { modules });
    return { ...state, modules };
  }
  case types.PROJECT_MODULE_EVENT: {
    const target = state.modules.find((item) => item._id === data._id);
    const blocked = guard_module(state, target);
    if (blocked) return blocked;

    let modules = [ ...state.modules ];
    let index = modules.findIndex((item) => (item._id === data._id));

    function move_item(from: number, to: number) {
      var f = modules.splice(from, 1)[0];
      modules.splice(to, 0, f);
    }

    switch (data.value.type) {
      case 'arrowdown':
        move_item(index, index + 1);
        break;
      case 'arrowup':
        move_item(index, index - 1);
        break;
      case 'remove':
        modules = modules.filter((item) => (item._id !== data._id));
        break;
      default:
        break;
    }
    update(state._id, { modules });
    return { ...state, modules: [...modules] };
  }
  case types.PROJECT_NEW_CONSTRUCTION: {
    if (data._id === null) return state;
    const target = state.modules.find((item) => item._id === data._id);
    const blocked = guard_module(state, target);
    if (blocked) return blocked;

    const modules = state.modules.map((item) => (item._id === data._id ? { ...item, constructions: [...item.constructions, data.value] } : item));
    update(state._id, { modules });
    return { ...state, modules };
  }
  case types.PROJECT_UPDATE_CONSTRUCTION: {
    if (data._id === null) return state;
    const target = state.modules.find((item) => item._id === data._id);
    const blocked = guard_module(state, target);
    if (blocked) return blocked;

    const modules = state.modules.map((item) => (item._id === data._id ? {
      ...item, constructions: [...item.constructions.map((c) => c._id === data.value._id ? { ...c, ...data.value } : { ...c } )]
    } : item));
    update(state._id, { modules });
    return { ...state, modules };
  }
  case types.PROJECT_CONSTRUCTION_EVENT: {
    if (data._id === null) return state;

    const module = state.modules.find((item) => (item._id === data._id));
    if (!module) return state;
    const blocked = guard_module(state, module);
    if (blocked) return blocked;

    let constructions = [ ...module.constructions ];
    let index = module.constructions.findIndex((item) => (item._id === data.value._id));

    function moveItem(from: number, to: number) {
      var f = constructions.splice(from, 1)[0];
      constructions.splice(to, 0, f);
    }

    switch (data.value.type) {
      case 'arrowdown':
        moveItem(index, index + 1);
        break;
      case 'arrowup':
        moveItem(index, index - 1);
        break;
      case 'remove':
        constructions = constructions.filter((item) => (item._id != data.value._id));
        break;
      default:
        break;
    }
    const modules = state.modules.map((item) => (item._id === data._id ? {
      ...item, constructions: [  ...constructions ]
    } : item));
    update(state._id, { modules });
    return { ...state, modules };
  }
  case types.PROJECT_UPDATE_PARAMETERS: {
    const blocked = guard_project(state);
    if (blocked) return blocked;

    const parameters = state.parameters.map((item) => (item.key === data.key ? { ...data } : item));
    update(state._id, { parameters });
    return { ...state, parameters };
  }
  default:
    return state;
  }
};

export default reducer;
