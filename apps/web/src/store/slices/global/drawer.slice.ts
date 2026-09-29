import { createSlice } from '@reduxjs/toolkit';

interface DrawerState {
  visible: boolean;
}

const initialState: DrawerState = {
  visible: true,
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggle_drawer: (state) => {
      state.visible = !state.visible;
    },
  },
});

export const {
  toggle_drawer,
} = drawerSlice.actions;
export default drawerSlice.reducer;
