import { types } from 'store/actions/settings/groups.actions';
import { Group } from 'administrator/models/group.model';

interface GroupsState {
  groups: Group[];
}

interface GroupsAction {
  type: string;
  data: any;
}

const initial_state: GroupsState = {
  groups: [],
};

const reducer = (state = initial_state, { type, data }: GroupsAction) => {
  switch (type) {
  case types.GROUPS_SET: {
    return { ...state, groups: [...data] };
  }
  case types.GROUPS_SET_ONE: {
    return { ...state, groups: [data, ...state.groups] };
  }
  case types.GROUPS_UPDATE: {
    const groups = state.groups.map((item) => (item._id === data._id ? { ...data } : item));
    return { ...state, groups };
  }
  case types.GROUPS_REMOVE: {
    const groups = state.groups.filter((item) => item._id !== data._id);
    return { ...state, groups };
  }
  default:
    return state;
  }
};

export default reducer;
