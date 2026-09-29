import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Flex } from 'components/grids/v5';
import { Button, TextField, Modal, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import { toast } from 'generics/services/v4';
import { ContentTitle } from 'components/titles/v3';
import { BUTTON_LABELS } from 'components/generics/v2';
import api from 'administrator/api/settings/v1';
import app_service from 'app/api/v1';

import { service } from '../../services';
import { ROUTE, } from '../../constants';
import { createDefaultModule } from '../../defaultModuleData';
import moment from 'moment';
import { Area } from 'administrator/models/area.model';
import { ConsoleSetting } from 'app/models/setting.model';
import { ParameterSet } from 'app/models/parameter.model';
import { Project } from 'app/models/project.model';

export const ITEM_HEADER = {
  context: 'Projectos',
  title: 'Creación de Proyectos',
};

interface CreateProjectConfirmationProps {
  area: Area;
}

const CreateProjectConfirmation = ({ area }: CreateProjectConfirmationProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, set_open] = useState(false);
  const [name, set_name] = useState('');
  const [parameter_list, set_parameter_list] = useState<ParameterSet[]>([]);
  const [parameter_id, set_parameter_id] = useState('');
  let parameters = useRef<any>(null);
  const { settings } = useSelector((state: any) => state.settings);

  const on_parameter_id_change = (event: any) => {
    set_parameter_id(event.target.value);
  };

  const on_create = () => {
    const data: Partial<Project> = {
      area_id: area._id,
      name: name,
      description: '',
      address: '',
      currency: settings.currency,
      currency_value: settings.currency_value,
      start_date: moment().startOf('day').toISOString(),
      end_date: moment().endOf('day').toISOString(),
      is_lock: false,
      locked_by: null,
      modules: [ createDefaultModule() ],
    };

    if (parameter_id) {
      data.parameter_id = parameter_id;
    } else {
      data.parameters = parameters.current;
    }

    service.create(data)
    .then(({ data}) => {
      navigate(`${ROUTE.LIST}/${data._id}`);
    })
    .catch(toast.api_danger);
  };

  useEffect(() => {
    api.settings.get_by_id(area._id)
    .then(({ data }) => {
      parameters.current = (data as ConsoleSetting).parameters;
    })
    .catch(toast.api_danger);

    app_service.parameters.find({ area_id: area._id })
    .then(({ data }) => {
      set_parameter_list(data);
    })
    .catch(toast.api_danger);
  }, [area, dispatch]);

  return (
    <>
      <Button variant="contained" onClick={() => set_open(true)} >{BUTTON_LABELS.CREATE}</Button>
      <Modal open={open} onClose={() => set_open(false)}>
        <Flex class_name="dialog-generic-flex text-separator">
          <ContentTitle config={ITEM_HEADER} />
          <Flex.Scrap>
            <Flex.Content>
              <TextField
                fullWidth
                name="name"
                label="Nombre del projecto"
                value={name}
                onChange={(e) => set_name(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel id="form-parameter-label">Parametros de calculo</InputLabel>
                <Select
                  fullWidth
                  label="Parametros de calculo"
                  labelId="form-parameter-label"
                  value={parameter_id}
                  onChange={on_parameter_id_change}
                >
                  {
                    parameter_list.map((parameter) => (
                      <MenuItem key={parameter._id} value={parameter._id}>
                        {parameter.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Flex.Content>
          </Flex.Scrap>
          <Flex.Buttoms>
            <Button variant="outlined" onClick={() => set_open(false)}>{BUTTON_LABELS.CANCEL}</Button>
            <Button variant="contained" onClick={on_create}>{BUTTON_LABELS.CREATE}</Button>
          </Flex.Buttoms>
        </Flex>
      </Modal>
    </>
  );
};

export { CreateProjectConfirmation };
