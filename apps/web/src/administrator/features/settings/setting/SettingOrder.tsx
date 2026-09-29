import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@mui/material';

import api from 'administrator/api/settings/v1';
import { useFormReducer } from 'generics/functions/forms/v2';
import { toast } from 'generics/services/v4';
import { AREA_UPDATE_TITLE } from '../setting.constants';
import { Area } from 'administrator/models/area.model';
import { Setting } from '../models/setting.model';
import { ContentTitle } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import { WButton, WNumberField, WTextField } from 'components/forms/v3';

interface SettingOrderProps {
  area: Area;
}

const SettingOrder = ({ area }: SettingOrderProps) => {
  const {
    item,
    set_item,
    on_string_change,
    on_number_change,
    on_checkbox_change,
  } = useFormReducer<Partial<Setting>>({});

  const on_update = () => {
    api.settings.update(area._id, item)
    .then(() => {
      toast.success('se actualizo correctamente');
    })
    .catch(toast.api_danger);
  };

  useEffect(() => {
    api.settings.get_by_id(area._id)
    .then(({ data }) => {
      set_item({
        order_counter: data.order_counter || 100,
        order_nim: data.order_nim || 100,
        order_max: data.order_max || 999,
        order_prefix: data.order_prefix || 'H',
        order_suffix: data.order_suffix || '',
        order_restart: data.order_restart || true,
      });
    })
    .catch(toast.api_danger);
  }, [set_item, area]);

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={AREA_UPDATE_TITLE} />
      <Flex.Item>
        <Flex.Content>
          <WNumberField name="order_counter" label="Contador ordenes" value={item.order_counter} onChange={on_number_change} />
          <WNumberField name="order_nim" label="Numero de orden inicial" value={item.order_nim} onChange={on_number_change} />
          <WNumberField name="order_max" label="Numero de orden limite" value={item.order_max} onChange={on_number_change} />
          <WTextField name="order_prefix" label="Prefijo" value={item.order_prefix} onChange={on_string_change} />
          <WTextField name="order_suffix" label="Sufijo" value={item.order_suffix} onChange={on_string_change} />
          <FormControlLabel
            control={<Checkbox name="order_restart" checked={!!item.order_restart} onChange={on_checkbox_change} />}
            label="¿Reiniciar cada dia?"
          />
        </Flex.Content>
        <Flex.Buttoms>
          <WButton variant="contained" on_click={on_update} label="Actualizar información" />
        </Flex.Buttoms>
      </Flex.Item>
    </Flex>
  );
};

SettingOrder.propTypes = {
  area: PropTypes.any.isRequired,
};

export { SettingOrder };
