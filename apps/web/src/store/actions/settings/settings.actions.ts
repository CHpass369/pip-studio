import { Setting } from 'administrator/features/settings/models/setting.model';

export const types = {
  SETTING_CREATE: 'setting-create',
  SETTING_DELETE: 'setting-delete',
};

const create_setting = (data: Setting) => ({
  type: types.SETTING_CREATE,
  data,
});

const delete_setting = (data: Setting) => ({
  type: types.SETTING_DELETE,
  data,
});

export default { create_setting, delete_setting };
