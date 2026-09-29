export const types = {
  AREA_CREATE_SETTING: 'area-create-setting',
  AREA_DELETE_SETTING: 'area-delete-setting',
};

const create_setting = (data) => ({
  type: types.AREA_CREATE_SETTING,
  data,
});

const delete_setting = (data) => ({
  type: types.AREA_DELETE_SETTING,
  data,
});

export default { create_setting, delete_setting };
