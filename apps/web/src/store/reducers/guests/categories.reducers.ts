import { types } from 'actions/guests/categories.actions';

const initial_state = {
  groups: [],
};

const reducer = (state = initial_state, { type, data }) => {
  switch (type) {
  case types.CATEGORIES_SET: {
    return { ...state, groups: [...data] };
  }
  case types.CATEGORIES_SET_ONE: {
    return { ...state, groups: [data, ...state.groups] };
  }
  case types.CATEGORIES_UPDATE: {
    const groups = state.groups.map((item) => (item._id === data._id ? { ...data } : item));
    return { ...state, groups };
  }
  case types.CATEGORIES_REMOVE: {
    const groups = state.groups.filter((item) => item._id !== data._id);
    return { ...state, groups };
  }
  default:
    return state;
  }
};

export default reducer;
