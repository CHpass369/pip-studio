import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';

import { WToggleButtonGroup, WToggleButtonGroupOption } from './WToggleButtonGroup';
import { set_state } from 'store/slices/global/grid.slice';
import type { ViewMode } from 'store/slices/global/grid.slice';

const VIEW_MODE_OPTIONS: WToggleButtonGroupOption[] = [
  { value: 'list', icon: <ViewListIcon /> },
  { value: 'grid', icon: <GridViewIcon /> },
];

const WViewModeToggle = () => {
  const dispatch = useDispatch();
  const { view_mode } = useSelector((state: any) => state.grid);

  const on_toggle_change = (new_value: string) => {
    dispatch(set_state(new_value as ViewMode));
  };

  return <WToggleButtonGroup value={view_mode} options={VIEW_MODE_OPTIONS} on_change={on_toggle_change} />;
};

export { WViewModeToggle };
export type { ViewMode };
