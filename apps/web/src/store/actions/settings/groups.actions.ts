import { Group } from 'administrator/models/group.model';

export const types = {
  GROUPS_SET: 'groups-set',
  GROUPS_SET_ONE: 'groups-set-one',
  GROUPS_UPDATE: 'groups-update',
  GROUPS_REMOVE: 'groups-remove',
};

const set = (data: Group[]) => ({
  type: types.GROUPS_SET,
  data,
});

const set_one = (data: Group) => ({
  type: types.GROUPS_SET_ONE,
  data,
});

const update = (data: Group) => ({
  type: types.GROUPS_UPDATE,
  data,
});

const remove = (data: Group) => ({
  type: types.GROUPS_REMOVE,
  data,
});

export default { set, set_one, update, remove };
