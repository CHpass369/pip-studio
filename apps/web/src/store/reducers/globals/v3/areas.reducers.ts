import { types } from 'store/actions/globals/v3/areas.actions';
import { Area } from 'administrator/models/area.model';

interface AreasState {
  areas: Area[];
}

interface AreasAction {
  type: string;
  data: any;
}

const initial_state: AreasState = {
  areas: [],
};

const reducer = (state = initial_state, { type, data }: AreasAction) => {
  switch (type) {
  case types.AREAS_SET: {
    return { ...state, areas: [...data] };
  }
  case types.AREAS_SET_ONE: {
    return { ...state, areas: [data, ...state.areas] };
  }
  case types.AREAS_UPDATE: {
    const areas = state.areas.map((item) => (item._id === data._id ? { ...data } : item));
    return { ...state, areas };
  }
  case types.AREAS_REMOVE: {
    const areas = state.areas.filter((item) => item._id !== data._id);
    return { ...state, areas };
  }
  default:
    return state;
  }
};

export default reducer;
