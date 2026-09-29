import { Area } from 'administrator/models/area.model';

export const types = {
  AREAS_SET: 'areas-set',
  AREAS_SET_ONE: 'areas-set-one',
  AREAS_UPDATE: 'areas-update',
  AREAS_REMOVE: 'areas-remove',
};

const set = (data: Area[]) => ({
  type: types.AREAS_SET,
  data,
});

const set_one = (data: Area) => ({
  type: types.AREAS_SET_ONE,
  data,
});

const update = (data: Area) => ({
  type: types.AREAS_UPDATE,
  data,
});

const remove = (data: Area) => ({
  type: types.AREAS_REMOVE,
  data,
});

export default { set, set_one, update, remove };
