import { Area } from 'administrator/models/area.model';

export const types = {
  SET_AREA: 'set-area',
};

const set_area = (data: Area) => ({
  type: types.SET_AREA,
  data,
});

export default { set_area };
