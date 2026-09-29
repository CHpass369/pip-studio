export const types = {
  CATEGORIES_SET: 'categories-set',
  CATEGORIES_SET_ONE: 'categories-set-one',
  CATEGORIES_UPDATE: 'categories-update',
  CATEGORIES_REMOVE: 'categories-remove',
};

const set = (data) => ({
  type: types.CATEGORIES_SET,
  data,
});

const set_one = (data) => ({
  type: types.CATEGORIES_SET_ONE,
  data,
});

const update = (data) => ({
  type: types.CATEGORIES_UPDATE,
  data,
});

const remove = (data) => ({
  type: types.CATEGORIES_REMOVE,
  data,
});

export default { set, set_one, update, remove };
