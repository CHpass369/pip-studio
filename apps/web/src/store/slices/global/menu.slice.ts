import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GENERIC } from 'generics/constants';

export interface MenuOption {
  key: string;
  label: string;
  uri: string;
}

interface MenuState {
  session_option: MenuOption[];
  main_option: MenuOption[];
  administration_option: MenuOption[];
  selected: MenuOption | null;
}

const HOME_OPTION: MenuOption = { key: 'home', label: 'Inicio', uri: GENERIC.APP_BASE_URL };

const initialState: MenuState = {
  session_option: [],
  main_option: [HOME_OPTION],
  administration_option: [
    { key: 'setting', label: 'Ajustes', uri: '/settings/detail' },
    { key: 'setting', label: 'Administración', uri: '/configuration/detail' },
  ],
  selected: null,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    set_session_option: (state, { payload }: PayloadAction<MenuOption[]>) => {
      state.session_option = payload;
    },
    set_main_option: (state, { payload }: PayloadAction<MenuOption[]>) => {
      state.main_option = payload;
    },
    set_administration_option: (state, { payload }: PayloadAction<MenuOption[]>) => {
      state.administration_option = payload;
    },
    set_selected: (state, { payload }: PayloadAction<MenuOption | null>) => {
      state.selected = payload;
    },
  },
});

export const {
  set_session_option,
  set_main_option,
  set_administration_option,
  set_selected,
} = menuSlice.actions;
export default menuSlice.reducer;
