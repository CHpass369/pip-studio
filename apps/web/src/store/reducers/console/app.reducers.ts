import { types } from 'store/actions/console/app.actions';

interface AppState {
  search: string;
  store: any;
}

interface AppAction {
  type: string;
  data: any;
}

const initialState: AppState = {
  search: '',
  store: null,
};

const reducer = (state = initialState, { type, data }: AppAction) => {
  switch (type) {
  case types.STORE_SEARCH: {
    return { ...state, search: data };
  }
  case types.STORE_STORE: {
    return { ...state, store: data };
  }
  default:
    return state;
  }
};

export default reducer;
