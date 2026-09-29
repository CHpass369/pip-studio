import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from 'administrator/api/globals/v3';
import { toast } from 'generics/services/v4';
import actions from 'store/actions/globals/v3';
import { BUTTON_LABELS } from 'components/generics/v2';
import { ContentTitle } from 'components/titles/v3';
import { useNavigate } from 'react-router';
import { Flex } from 'components/grids/v5';
import { IButton } from 'components/buttons/v2';
import { WButton } from 'components/forms/v3';
import { LinearListOption } from 'components/lists/v1';
import { LIST_AREAS_TITLE } from '../areas.constants';
import { Area } from 'administrator/models/area.model';

interface AreasProps {
  area: Area;
}

const Areas = ({ area }: AreasProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { areas } = useSelector((state: any): { areas: Area[] } => state.areas);

  const on_create = useCallback(() => {
    api.areas.create({
      name: 'Group Area Inc.',
      description: 'description generator',
      image_id: null,
      enabled: true,
      group_id: area.group_id,
    })
    .then(({ data }) => {
      dispatch(actions.areas.set_one(data));
    })
    .catch(toast.api_danger);
  }, [dispatch, area]);

  const on_select = useCallback((item: Area) => {
    navigate(`/configuration/areas/${item._id}`);
  }, [navigate]);

  const on_select_area = useCallback((item: Area) => {
    dispatch(actions.apps.set_area(item));
  }, [dispatch]);

  const render_options = (item: Area) => (
    <IButton label="Seleccionar area" icon="checkmark" on_click={() => on_select_area(item)} />
  );

  useEffect(() => {
    api.areas.find({})
    .then(({ data }) => {
      dispatch(actions.areas.set(data));
    })
    .catch(toast.api_danger);
  }, [dispatch]);

  return (
    <div>
      <ContentTitle config={LIST_AREAS_TITLE} />
      <Flex.Item>
        <Flex.End>
          <WButton variant="contained" on_click={on_create} label={BUTTON_LABELS.NEW} />
        </Flex.End>
        <LinearListOption items={areas} on_select={on_select} options={render_options} />
      </Flex.Item>
    </div>
  );
};

export { Areas };
