import { types } from 'store/actions/guests/area.actions';

const initial_state = {
  setting: null,
};

const reducer = (state = initial_state, { type, data }) => {
  switch (type) {
  case types.AREA_CREATE_SETTING: {
    return { ...state, setting: { ...data } };
  }
  case types.AREA_DELETE_SETTING: {
    return { ...state, setting: null };
  }
  default:
    return state;
  }
};

export default reducer;
