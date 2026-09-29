import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem } from '@mui/material';

import actions from 'store/actions/globals/v3';
import { Area } from 'administrator/models/area.model';

import './AreaSelector.scss';

const AreaSelector = () => {
  const dispatch = useDispatch();
  const { area } = useSelector((state: any): { area: Area | null } => state.apps);
  const { areas } = useSelector((state: any): { areas: Area[] } => state.areas);

  const on_area_change = (event: any) => {
    const selected = areas.find((item) => item._id === event.target.value);
    if (!selected) {
      return;
    }

    dispatch(actions.apps.set_area(selected));
  };

  if (!area || areas.length === 0) {
    return null;
  }

  return (
    <Select
      className="area-selector"
      size="small"
      value={area._id}
      onChange={on_area_change}
    >
      {areas.map((item) => (
        <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
      ))}
    </Select>
  );
};

export { AreaSelector };
