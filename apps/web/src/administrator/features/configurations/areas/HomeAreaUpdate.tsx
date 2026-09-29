import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import actions from 'store/actions/globals/v3';
import api from 'administrator/api/globals/v3';
import { toast } from 'generics/services/v4';
import { BUTTON_LABELS } from 'components/generics/v2';
import { ContentTitle } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import { useFormReducer } from 'generics/functions/forms/v2';
import { WButton, WTextField } from 'components/forms/v3';
import { UImage } from 'components/images/v3';
import { AREA_UPDATE_TITLE } from '../areas.constants';
import { Area } from 'administrator/models/area.model';

interface HomeAreaUpdateProps {
  area: Area;
}

const HomeAreaUpdate = ({ area }: HomeAreaUpdateProps) => {
  const dispatch = useDispatch();
  const {
    item,
    set_item,
    on_string_change,
  } = useFormReducer<Partial<Area>>({
    _id: area._id,
    name: area.name,
    image_id: area.image_id,
    banner_id: area.banner_id,
    description: area.description,
  });

  const on_update = () => {
    api.areas.update(area._id, item)
    .then(({ data }) => {
      dispatch(actions.apps.set_area(data));
      toast.success('se actualizo correctamente');
    })
    .catch(toast.api_danger);
  };

  const handle_image = useCallback((data: Partial<Area>) => {
    set_item((prev) => ({ ...prev, ...data }));
  }, [set_item]);

  const handle_banner = useCallback(({ image_id }: { image_id: string }) => {
    set_item((prev) => ({ ...prev, banner_id: image_id }));
  }, [set_item]);

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={AREA_UPDATE_TITLE} />
      <Flex.Item>
        <Flex.Content>
          <WTextField name="name" label="Nombre" value={item.name} onChange={on_string_change} />
          <WTextField multiline rows={4} name="description" label="Descripción" value={item.description} onChange={on_string_change} />
          <label>Logo</label>
          <UImage image={item.image_id} height="150px" quality={1080} on_callback={handle_image} />
          <label>Banner</label>
          <UImage image={item.banner_id ?? undefined} height="150px" on_callback={handle_banner} />
        </Flex.Content>
        <Flex.Buttoms>
          <WButton variant="contained" on_click={on_update} label={BUTTON_LABELS.UPDATE} />
        </Flex.Buttoms>
      </Flex.Item>
    </Flex>
  );
};

export { HomeAreaUpdate };
