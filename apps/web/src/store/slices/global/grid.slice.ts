import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storage as StorageService } from 'generics/services/v4';

export type ViewMode = 'list' | 'grid';

interface GridState {
  view_mode: ViewMode;
}

const initialState: GridState = {
  view_mode: StorageService.load('view_mode') || 'list',
};

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    set_state: (state, { payload }: PayloadAction<ViewMode>) => {
      state.view_mode = payload;
      StorageService.save('view_mode', payload);
    },
  },
});

export const {
  set_state,
} = gridSlice.actions;
export default gridSlice.reducer;
