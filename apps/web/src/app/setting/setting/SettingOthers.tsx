import React, { useEffect } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import api from 'administrator/api/settings/v1';
import { toast } from 'generics/services/v4';
import { ContentTitle } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import { useFormReducer } from 'generics/functions/forms/v2';
import { WNumberField, WTextField } from 'components/forms/v3';

import { AREA_UPDATE_TITLE } from '../setting.constants';
import { apply_setting_defaults, DEFAULT_CURRENCY, DEFAULT_ROUND } from '../setting.defaults';
import { AMERICAN_CURRENCIES } from 'app/console/projects/constants';
import { Area } from 'administrator/models/area.model';
import { ConsoleSetting } from 'app/models/setting.model';

interface SettingOthersProps {
  area: Area;
}

const SettingOthers = ({ area }: SettingOthersProps) => {
  const {
    item,
    set_item,
    on_float_change,
    on_number_change,
  } = useFormReducer<Partial<ConsoleSetting>>({});

  const on_update = () => {
    api.settings.update(area._id, item)
    .then(() => {
      toast.success('se actualizo correctamente');
    })
    .catch(toast.api_danger);
  };

  const on_currency_change = (type: string) => (event: any) => {
    event.stopPropagation();
    const key = event.target.value;
    const data = {
      ...item,
      currency: {
        ...item.currency,
        [type]: key,
      },
    };
    set_item(data);
  };

  useEffect(() => {
    api.settings.get_by_id(area._id)
    .then(({ data }) => {
      const { currency, currency_value, round } = apply_setting_defaults(data as ConsoleSetting);
      set_item({ currency, currency_value, round });
    })
    .catch(toast.api_danger);
  }, [set_item, area]);

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={AREA_UPDATE_TITLE} />
      <Flex.Item>
        <Flex.Content>
          <FormControl fullWidth>
            <InputLabel id="form-currency-international-label">Moneda internacional</InputLabel>
            <Select
              fullWidth
              label="Moneda internacional"
              labelId="form-currency-international-label"
              name="currency_international"
              value={item.currency?.international || DEFAULT_CURRENCY.international}
              onChange={on_currency_change('international')}
            >
              {
                AMERICAN_CURRENCIES.map((currency) => (
                  <MenuItem key={currency.key} value={currency.key}>
                    {`${currency.name} (${currency.label})`}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="form-currency-local-label">Moneda local</InputLabel>
            <Select
              fullWidth
              label="Moneda local"
              labelId="form-currency-local-label"
              name="currency_local"
              value={item.currency?.local || DEFAULT_CURRENCY.local}
              onChange={on_currency_change('local')}
            >
              {
                AMERICAN_CURRENCIES.map((currency) => (
                  <MenuItem key={currency.key} value={currency.key}>
                    {`${currency.name} (${currency.label})`}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <WNumberField name="currency_value" label="Tipo de cambio" value={item.currency_value} onChange={on_float_change} />
          <FormControl fullWidth>
            <InputLabel id="form-round-label">Decimales</InputLabel>
            <Select
              fullWidth
              label="Decimales"
              labelId="form-round-label"
              name="round"
              value={item.round ?? DEFAULT_ROUND}
              onChange={on_number_change}
            >
              {
                [0, 1, 2, 3, 4].map((round) => (
                  <MenuItem key={round} value={round}>{round}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Flex.Content>
        <Flex.Buttoms>
          <Button variant="contained" onClick={on_update}>Actualizar información</Button>
        </Flex.Buttoms>
      </Flex.Item>
    </Flex>
  );
};

export { SettingOthers };
