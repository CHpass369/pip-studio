import { storage } from 'generics/services/v4';

import { types } from 'store/actions/globals/v3/apps.actions';
import { types as auth_types } from 'store/actions/globals/v3/auth.actions';
import { Area } from 'administrator/models/area.model';

interface AppsState {
  area: Area | null;
}

interface AppsAction {
  type: string;
  data: any;
}

const initialState: AppsState = {
  area: storage.load('area') || null,
};

const reducer = (state = initialState, { type, data }: AppsAction) => {
  switch (type) {
  case types.SET_AREA: {
    storage.save('area', data);
    return { ...state, area: data };
  }
  case auth_types.LOGOUT: {
    return { ...state, area: null };
  }
  default:
    return state;
  }
};

export default reducer;
