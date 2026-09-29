import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

import { BUTTON_LABELS, RemoveDialog } from 'components/generics/v2';
import { toast } from 'generics/services/v4';
import { ContentTitle } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import { useFormReducer } from 'generics/functions/forms/v2';
import app_service from 'app/api/v1';

import { service } from '../services';
import { ITEM_HEADER, ROUTE } from '../constants';
import { WNumberField } from 'components/forms/v3';
import { Area } from 'administrator/models/area.model';
import { Measure } from 'app/models/measure.model';

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
    measure_id: '',
    description: '',
  });
  const [measures, set_measures] = useState<Measure[]>([]);

  const create = () => {
    service.create(item)
    .then(() => {
      navigate(ROUTE.LIST);
    })
    .catch(toast.api_danger);
  };

  const update = () => {
    service.update(_id as string, item)
    .then(() => {
      navigate(ROUTE.LIST);
    })
    .catch(toast.api_danger);
  };

  const on_cancel = () => {
    navigate(ROUTE.LIST);
  };

  const on_submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (is_new) {
      create();
    } else {
      update();
    }
  };

  const on_remove_callback = useCallback(() => {
    service.remove(_id as string)
    .then(() => {
      navigate(ROUTE.LIST);
    })
    .catch(toast.api_danger);
  }, [navigate, _id]);

  useEffect(() => {
    app_service.measures.find({ area_id: area._id })
    .then(({ data }) => {
      set_measures(data);
      if (is_new) return;

      return service.get_by_id(_id as string);
    })
    .then((response) => {
      if (response) {
        set_item(response.data);
      }
    })
    .catch(toast.api_danger);
  }, [_id, is_new, set_item, area]);

  const on_measure_change = (event: SelectChangeEvent) => {
    set_item({ ...item, measure_id: event.target.value });
  };

  const render_buttons = () => {
    if (is_new) {
      return (
        <>
          <Button variant="outlined" onClick={on_cancel}>Cancelar</Button>
          <Button variant="contained" type="submit">{BUTTON_LABELS.CREATE}</Button>
        </>
      );
    }

    return (
      <>
        <RemoveDialog label={BUTTON_LABELS.REMOVE} on_click={on_remove_callback} />
        <Button variant="contained" type="submit">{BUTTON_LABELS.UPDATE}</Button>
      </>
    );
  };

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={ITEM_HEADER} />
      <Flex.Item>
        <form onSubmit={on_submit}>
          <Flex.Content>
            <TextField fullWidth name="name" label="Nombre del material" value={item.name} onChange={on_string_change} />
            <WNumberField name="price" label="Precio" value={item.price} onChange={on_float_change} />
            <FormControl fullWidth>
              <InputLabel id="form-measure-label">Unidad de Medida</InputLabel>
              <Select
                fullWidth
                label="Unidad de Medida"
                value={item.measure_id}
                onChange={on_measure_change}
              >
                {
                  measures.map((measure) => (
                    <MenuItem key={measure._id} value={measure._id}>
                      {measure.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <TextField fullWidth multiline rows={4} name="description" label="Description" value={item.description} onChange={on_string_change} />
          </Flex.Content>
          <Flex.Buttoms>
            {render_buttons()}
          </Flex.Buttoms>
        </form>
      </Flex.Item>
    </Flex>
  );
};

export { GItem };
