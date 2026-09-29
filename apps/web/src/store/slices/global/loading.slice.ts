import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  loading: boolean;
  error: unknown;
}

const initialState: LoadingState = {
  loading: false,
  error: null,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    on_started: (state) => {
      state.loading = true;
      state.error = null;
    },
    on_stopped: (state) => {
      state.loading = false;
      state.error = null;
    },
    on_success: (state) => {
      state.loading = false;
      state.error = null;
    },
    on_failure: (state, { payload }: PayloadAction<unknown>) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  on_started,
  on_stopped,
  on_success,
  on_failure,
} = loadingSlice.actions;
export default loadingSlice.reducer;
