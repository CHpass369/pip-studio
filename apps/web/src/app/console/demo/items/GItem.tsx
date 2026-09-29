import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '@mui/material';

import { BUTTON_LABELS, RemoveDialog } from 'components/generics/v2';
import { toast } from 'generics/services/v4';
import { ContentTitle } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import { useFormReducer } from 'generics/functions/forms/v2';
import { WNumberField, WTextField } from 'components/forms/v3';

import { service } from '../services';
import { ITEM_HEADER, ROUTE } from '../constants';
import { Area } from 'administrator/models/area.model';

interface GItemProps {
  area: Area;
}

const GItem = ({ area }: GItemProps) => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [is_new] = useState(_id === undefined);
  const {
    item,
    set_item,
    on_string_change,
    on_float_change,
  } = useFormReducer({
    area_id: area._id,
    name: '',
    price: 0,
    description: '',
  });

  const on_create = () => {
    service.create(item)
    .then(() => {
      navigate(ROUTE.LIST);
    })
    .catch(toast.api_danger);
  };

  const on_update = () => {
    service.update(_id as string, item)
    .then(() => {
      navigate(ROUTE.LIST);
    })
    .catch(toast.api_danger);
  };

  const on_cancel = () => {
    navigate(ROUTE.LIST);
  };

  const on_remove_callback = useCallback(() => {
    service.remove(_id as string)
    .then(() => {
      navigate(ROUTE.LIST);
    })
    .catch(toast.api_danger);
  }, [navigate, _id]);

  useEffect(() => {
    if (is_new) return;

    service.get_by_id(_id as string)
    .then(({ data }) => {
      set_item(data);
    })
    .catch(toast.api_danger);
  }, [is_new, _id, set_item]);

  const render_buttons = () => {
    if (is_new) {
      return (
        <>
          <Button variant="outlined" onClick={on_cancel}>Cancelar</Button>
          <Button variant="contained" onClick={on_create}>{BUTTON_LABELS.CREATE}</Button>
        </>
      );
    }

    return (
      <>
        <RemoveDialog label={BUTTON_LABELS.REMOVE} on_click={on_remove_callback} />
        <Button variant="contained" onClick={on_update}>{BUTTON_LABELS.UPDATE}</Button>
      </>
    );
  };

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={ITEM_HEADER} />
      <Flex.Item>
        <Flex.Content>
          <WTextField name="name" label="Nombre" value={item.name} onChange={on_string_change} />
          <WNumberField name="price" label="Valor" value={item.price} onChange={on_float_change} />
          <WTextField multiline rows={4} name="description" label="Description" value={item.description} onChange={on_string_change} />
        </Flex.Content>
        <Flex.Buttoms>
          {render_buttons()}
        </Flex.Buttoms>
      </Flex.Item>
    </Flex>
  );
};

export { GItem };
