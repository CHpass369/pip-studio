import { types } from 'store/actions/settings/settings.actions';
import { Setting } from 'administrator/features/settings/models/setting.model';

interface SettingsState {
  settings: Setting | null;
}

interface SettingsAction {
  type: string;
  data: any;
}

const initial_state: SettingsState = {
  settings: null,
};

const reducer = (state = initial_state, { type, data }: SettingsAction) => {
  switch (type) {
  case types.SETTING_CREATE: {
    return { ...state, settings: { ...data } };
  }
  case types.SETTING_DELETE: {
    return { ...state, settings: null };
  }
  default:
    return state;
  }
};

export default reducer;
