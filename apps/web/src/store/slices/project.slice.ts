import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Construction } from 'app/models/construction.model';
import { Measure } from 'app/models/measure.model';
import { ProjectModule } from 'app/models/project.model';
import { Resource } from 'app/models/resource.model';

interface ProjectAssetsState {
  module_id: string | null;
  materials: Resource[];
  workers: Resource[];
  tools: Resource[];
  measures: Measure[];
  constructions: Construction[];
  parameters: any;
  copied_module: ProjectModule | null;
}

const initial_state: ProjectAssetsState = {
  module_id: null,
  materials: [],
  workers: [],
  tools: [],
  measures: [],
  constructions: [],
  parameters: null,
  copied_module: null,
};

export const counterSlice = createSlice({
  name: 'project_assets',
  initialState: initial_state,
  reducers: {
    set_materials: (state, { payload }: PayloadAction<Resource[]>) => {
      state.materials = payload;
    },
    set_workers: (state, { payload }: PayloadAction<Resource[]>) => {
      state.workers = payload;
    },
    set_tools: (state, { payload }: PayloadAction<Resource[]>) => {
      state.tools = payload;
    },
    set_constructions: (state, { payload }: PayloadAction<Construction[]>) => {
      state.constructions = payload;
    },
    set_parameters: (state, { payload }: PayloadAction<any>) => {
      state.parameters = payload;
    },
    set_measures: (state, { payload }: PayloadAction<Measure[]>) => {
      state.measures = payload;
    },
    set_module_id: (state, { payload }: PayloadAction<string | null>) => {
      state.module_id = payload;
    },
    set_copied_module: (state, { payload }: PayloadAction<ProjectModule | null>) => {
      state.copied_module = payload;
    },
  },
});

export const {
  set_materials,
  set_workers,
  set_tools,
  set_constructions,
  set_parameters,
  set_measures,
  set_module_id,
  set_copied_module,
} = counterSlice.actions;
export default counterSlice.reducer;
