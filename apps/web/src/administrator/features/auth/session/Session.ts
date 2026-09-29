import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import global_api from 'administrator/api/globals/v3';
import settings_api from 'administrator/api/settings/v1';
import global_actions from 'store/actions/globals/v3';
import actions from 'store/actions/settings';
import { toast, storage } from 'generics/services/v4';
import { Area } from 'administrator/models/area.model';

const Session = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state: any) => state.auth);

  const load_area_setting = useCallback((tmp_area: Area) => {
    settings_api.settings.get_by_id(tmp_area._id)
    .then(({ data }) => {
      dispatch(actions.settings.create_setting(data));
    })
    .catch(toast.api_danger);
  }, [dispatch]);

  useEffect(() => {
    if (!account) return;

    global_api.areas.find({})
    .then(({ data }) => {
      const stored_area = storage.load('area');
      let tmp_area = data[0];
      if (stored_area) {
        tmp_area = data.find((item) => item._id === stored_area._id) || tmp_area;
      }
      dispatch(global_actions.areas.set(data));
      if (!tmp_area) return;

      load_area_setting(tmp_area);
      dispatch(global_actions.apps.set_area(tmp_area));
    })
    .catch(toast.api_danger);
  }, [dispatch, load_area_setting, account]);

  return null;
};

export { Session };
