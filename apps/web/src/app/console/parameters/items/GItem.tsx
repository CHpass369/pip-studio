import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button, TextField } from '@mui/material';

import { BUTTON_LABELS, RemoveDialog } from 'components/generics/v2';
import { toast } from 'generics/services/v4';
import { ContentTitle } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import { useFormReducer } from 'generics/functions/forms/v2';
import { CalcParameters } from 'app/console/calc_parameters/CalcParameters';

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
  } = useFormReducer({
    area_id: area._id,
    name: 'Parametro de Calculo',
    parameters: [
      { key: 'A', label: 'MATERIALES', formula: '*', ratio: 0, is_total: false },
      { key: 'B', label: 'MANO DE OBRA', formula: '*', ratio: 0, is_total: false },
      { key: 'C', label: 'EQUIPO, MAQUINARIA Y HERRAMIENTAS', formula: '*', ratio: 0, is_total: false },
      { key: 'D', label: 'TOTAL MATERIALES', formula: 'A', ratio: 0, is_total: true },
      { key: 'E', label: 'MANO DE OBRA INDIRECTA', formula: 'B', ratio: 0, is_total: false },
      { key: 'F', label: 'CARGAS SOCIALES', formula: 'B', ratio: 55, is_total: false },
      { key: 'G', label: 'TOTAL MANO DE OBRA', formula: 'B+E+F', ratio: 0, is_total: true },
      { key: 'H', label: 'HERRAMIENTAS MENORES', formula: 'B', ratio: 5, is_total: false },
      { key: 'I', label: 'TOTAL HERRAMIENTAS', formula: 'C+H', ratio: 0, is_total: true },
      { key: 'J', label: 'SUB TOTAL', formula: 'D+G+I', ratio: 0, is_total: true },
      { key: 'K', label: 'INPREVISTOS', formula: 'J', ratio: 0, is_total: false },
      { key: 'L', label: 'GASTOS GENERALES', formula: 'J', ratio: 5, is_total: false },
      { key: 'M', label: 'UTILIDAD', formula: 'J', ratio: 5, is_total: false },
      { key: 'N', label: 'PARCIAL', formula: 'J+K+L+M', ratio: 0, is_total: true },
      { key: 'O', label: 'IMPUESTOS IVA', formula: 'N', ratio: 14.94, is_total: false },
      { key: 'P', label: 'IMPUESTOS IT', formula: 'N', ratio: 3.9, is_total: false },
      { key: 'Q', label: 'N/A', formula: 'N', ratio: 0, is_total: false },
      { key: 'T', label: 'TOTAL ITEM', formula: 'N+O+P', ratio: 0, is_total: true },
    ],
    formula: '',
    description: '',
  });

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

  const on_change = useCallback((value: any) => {
    set_item((i) => ({ ...i, parameters: i.parameters.map((p) => (p.key === value.key ? { ...value } : { ...p })) }));
  }, []);

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
  }, [_id, is_new, set_item]);

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
            <TextField fullWidth name="name" label="Nombre" value={item.name} onChange={on_string_change} />
            <div style={{ marginTop: '16px', marginBottom: '16px' }}>
              <CalcParameters
                items={item.parameters}
                partials={[10000, 10000, 10000]}
                on_change={on_change}
                display_parcial={true}
                title={false}
              />
            </div>
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
