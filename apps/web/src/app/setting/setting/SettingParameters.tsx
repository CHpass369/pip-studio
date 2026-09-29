import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@mui/material';

import api from 'administrator/api/settings/v1';
import { toast } from 'generics/services/v4';
import { Flex } from 'components/grids/v5';
import { CalcParameters } from 'app/console/calc_parameters/CalcParameters';
import { Area } from 'administrator/models/area.model';
import { Parameter } from 'app/models/parameter.model';
import { ConsoleSetting } from 'app/models/setting.model';
import { apply_setting_defaults } from '../setting.defaults';

export const EMPTY_LIST_MESSAGE = 'No existe los parametros de calculo registradas';

interface SettingParametersProps {
  area: Area;
}

const SettingParameters = ({ area }: SettingParametersProps) => {
  const [parameters, set_parameters] = useState<Parameter[] | null>(null);
  const partials = [5000, 3000, 2000];

  const on_change = useCallback((data: Parameter) => {
    if (!data) {
      throw new Error('data is undefined');
    }

    set_parameters((items) => (items || []).map((item) => (item.key === data.key ? { ...data } : item)));
  }, []);

  const on_update = () => {
    const setting: Partial<ConsoleSetting> = { parameters: parameters as Parameter[] };

    api.settings.update(area._id, setting)
    .then(() => {
      toast.success('se actualizo correctamente');
    })
    .catch(toast.api_danger);
  };

  useEffect(() => {
    api.settings.get_by_id(area._id)
    .then(({ data }) => {
      const { parameters } = apply_setting_defaults(data as ConsoleSetting);
      set_parameters(parameters);
    })
    .catch(toast.api_danger);
  }, [area]);

  if (!parameters) return null;

  return (
    <>
      <CalcParameters partials={partials} items={parameters} on_change={on_change} />
      <Flex.Buttoms>
        <Button variant="contained" onClick={on_update}>Actualizar información</Button>
      </Flex.Buttoms>
    </>
  );
};

export { SettingParameters };
