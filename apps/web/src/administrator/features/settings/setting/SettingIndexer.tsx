import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import api from 'administrator/api/settings/v1';
import { useFormReducer } from 'generics/functions/forms/v2';
import { toast } from 'generics/services/v4';
import { AREA_UPDATE_TITLE } from '../setting.constants';
import { Area } from 'administrator/models/area.model';
import { Setting } from '../models/setting.model';
import { ContentTitle } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import { WButton, WNumberField } from 'components/forms/v3';

const printerOptions = [
  { value: 'invoice', text: 'Factura' },
  { value: 'half_card', text: 'Media carta' },
];

interface SettingIndexerProps {
  area: Area;
}

const SettingIndexer = ({ area }: SettingIndexerProps) => {
  const {
    item,
    set_item,
    on_number_change,
  } = useFormReducer<Partial<Setting>>({});

  const on_update = () => {
    api.settings.update(area._id, item)
    .then(() => {
      toast.success('se actualizo correctamente');
    })
    .catch(toast.api_danger);
  };

  const on_type_change = (event: any) => {
    set_item({ ...item, printer_type: event.target.value });
  };

  useEffect(() => {
    api.settings.get_by_id(area._id)
    .then(({ data }) => {
      set_item({
        order_index_counter: data.order_index_counter || 1,
        sale_counter: data.sale_counter || 1,
        buy_counter: data.buy_counter || 1,
        printer_type: data.printer_type || 'invoice',
      });
    })
    .catch(toast.api_danger);
  }, [set_item, area]);

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={AREA_UPDATE_TITLE} />
      <Flex.Item>
        <Flex.Content>
          <WNumberField name="order_index_counter" label="Numeración de checkout" value={item.order_index_counter} onChange={on_number_change} />
          <WNumberField name="sale_counter" label="Numeración de ventas" value={item.sale_counter} onChange={on_number_change} />
          <WNumberField name="buy_counter" label="Numeración de compras" value={item.buy_counter} onChange={on_number_change} />
          <FormControl fullWidth size="small">
            <InputLabel id="printer-type-label">Impresora</InputLabel>
            <Select labelId="printer-type-label" label="Impresora" name="printer_type" value={item.printer_type || ''} onChange={on_type_change}>
              {printerOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Flex.Content>
        <Flex.Buttoms>
          <WButton variant="contained" on_click={on_update} label="Actualizar información" />
        </Flex.Buttoms>
      </Flex.Item>
    </Flex>
  );
};

SettingIndexer.propTypes = {
  area: PropTypes.any.isRequired,
};

export { SettingIndexer };
