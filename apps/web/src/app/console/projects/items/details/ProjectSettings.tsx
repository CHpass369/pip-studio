import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Chip, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { BUTTON_LABELS, RemoveDialog } from 'components/generics/v2';
import { toast } from 'generics/services/v4';
import { Flex } from 'components/grids/v5';
import { GeolocationMap } from 'components/maps/v1';
import { useFormReducer, useReduxReducer } from 'generics/functions/forms/v2';
import actions from 'store/actions/console';
import app_service from 'app/api/v1';

import { service } from '../../services';
import { ROUTE, AMERICAN_CURRENCIES } from '../../constants';
import { Area } from 'administrator/models/area.model';
import { ParameterSet } from 'app/models/parameter.model';
import { Zone } from 'app/models/zone.model';
import { Geolocation } from 'app/models/project.model';

interface ProjectSettingsProps {
  area: Area;
}

const ProjectSettings = ({ area }: ProjectSettingsProps) => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state: any) => state.project);
  const { account } = useSelector((state: any) => state.auth);
  const [parameter_list, set_parameter_list] = useState<ParameterSet[]>([]);
  const [zone_list, set_zone_list] = useState<Zone[]>([]);

  const is_locked = !!project.is_lock;
  const is_owner = !!(account && project.locked_by && account._id === project.locked_by._id);
  const can_edit = !is_locked || is_owner;

  const on_change = useCallback((data: any) => {
    dispatch(actions.project.update(data));
  }, [dispatch]);

  const {
    item,
    on_string_change,
    on_float_change,
  } = useReduxReducer(project, on_change);

  useEffect(() => {
    app_service.parameters.find({ area_id: area._id })
    .then(({ data }) => {
      set_parameter_list(data);
    })
    .catch(toast.api_danger);

    app_service.zones.find({ area_id: area._id })
    .then(({ data }) => {
      set_zone_list(data);
    })
    .catch(toast.api_danger);
  }, [area]);

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

  const on_parameter_change = (event: any) => {
    event.stopPropagation();
    const value = event.target.value;
    const parameter = parameter_list.find((parameter) => parameter._id === value);
    const data = { ...item, parameter_id: parameter._id, parameters: parameter.parameters };
    on_change(data);
  };

  const on_zones_change = (event: any) => {
    event.stopPropagation();
    const { value } = event.target;
    const zones = typeof value === 'string' ? value.split(',') : value;
    on_change({ zones });
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
    on_change(data);
  };

  const renderButtons = () => {
    return (
      <>
        <RemoveDialog label={BUTTON_LABELS.REMOVE} on_click={on_remove_callback} disabled={!can_edit} />
        <Button variant="contained" onClick={on_cancel}>{BUTTON_LABELS.CANCEL}</Button>
        {/* <Button variant="contained" type="submit">{BUTTON_LABELS.UPDATE}</Button> */}
      </>
    );
  };

  const on_geolocation_change = useCallback((geolocation: Geolocation) => {
    on_change({ geolocation });
  }, [on_change]);

  const render_dates = () => {
    const start = moment(project.start_date).format('YYYY-MM-DD');
    const end = moment(project.end_date).format('YYYY-MM-DD');

    const on_start_date_change = (event: any) => {
      event.stopPropagation();
      on_change({ start_date: moment(event.target.value).startOf('day').toISOString() });
    };

    const on_end_date_change = (event: any) => {
      event.stopPropagation();
      on_change({ end_date: moment(event.target.value).endOf('day').toISOString() });
    };

    return (
      <>
        <TextField 
          fullWidth 
          type="date"
          name="start_date" 
          label="Fecha inicio de projecto" 
          value={start} 
          onChange={on_start_date_change} 
        />
        <TextField 
          fullWidth 
          type="date"
          name="end_date" 
          label="Fecha fin de projecto" 
          value={end} 
          onChange={on_end_date_change} 
        />
      </>
    );
  };

  return (
    <Flex class_name="text-separator">
      <Flex.Item>
        <Flex direction={Flex.H}>
          <Flex.Item flex={2}>
            <Flex.Content>
              <TextField 
                fullWidth 
                name="name" 
                label="Nombre del projecto" 
                value={project.name}
                onChange={on_string_change} 
              />
              {render_dates()}
              
              <TextField 
                fullWidth
                multiline
                rows={4}
                name="description" 
                label="Descripción del projecto" 
                value={item.description} 
                onChange={on_string_change} 
              />
              <TextField 
                fullWidth 
                name="address" 
                label="Dirección" 
                value={item.address} 
                onChange={on_string_change} 
              />
              <TextField
                fullWidth
                name="builder"
                label="Empresa contructora"
                value={item.builder}
                onChange={on_string_change}
              />
              <TextField
                fullWidth
                name="client_name"
                label="Nombre del cliente"
                value={item.client_name}
                onChange={on_string_change}
              />
              <TextField
                fullWidth
                name="client_number"
                label="Teléfono del cliente"
                value={item.client_number}
                onChange={on_string_change}
              />
              <TextField
                fullWidth
                type="number"
                name="currency_value"
                label="Tipo de cambio"
                value={item.currency_value}
                onChange={on_float_change}
              />
              <FormControl fullWidth>
                <InputLabel id="form-currency-international-label">Moneda internacional</InputLabel>
                <Select
                  fullWidth
                  label="Moneda internacional"
                  labelId="form-currency-international-label"
                  name="currency_international"
                  value={item.currency?.international || 'USD'}
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
                  value={item.currency?.local || 'BOB'}
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
              
              <FormControl fullWidth>
                <InputLabel id="form-parameter-label">Parametros de calculo</InputLabel>
                <Select
                  fullWidth
                  label="Parametros de calculo"
                  labelId="form-parameter-label"
                  name="parameter_id"
                  value={item.parameter_id || ''}
                  onChange={on_parameter_change}
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
              <FormControl fullWidth>
                <InputLabel id="form-zones-label">Zonas</InputLabel>
                <Select
                  fullWidth
                  multiple
                  label="Zonas"
                  labelId="form-zones-label"
                  name="zones"
                  value={item.zones || []}
                  onChange={on_zones_change}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((zone_id) => {
                        const zone = zone_list.find((zone) => zone._id === zone_id);
                        return <Chip key={zone_id} label={zone ? zone.name : zone_id} />;
                      })}
                    </Box>
                  )}
                >
                  {
                    zone_list.map((zone) => (
                      <MenuItem key={zone._id} value={zone._id}>
                        {zone.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <div>
                <h4 style={{ margin: '0 0 8px' }}>Geolocalización</h4>
                <GeolocationMap value={item.geolocation} on_change={on_geolocation_change} />
              </div>
              {/* <TextField
                fullWidth 
                disabled
                type="text" 
                name="price" 
                label="Foto inicio de obra"
                value={item.start_image} 
                onChange={on_number_change} 
              />
              <TextField 
                fullWidth 
                disabled
                type="text" 
                name="price" 
                label="Foto final de obra"
                value={item.end_image} 
                onChange={on_number_change} 
              /> */}
            </Flex.Content>
            
            <Flex.Buttoms>
              {renderButtons()}
            </Flex.Buttoms>
          </Flex.Item>
        </Flex>
      </Flex.Item>
    </Flex>
  );
};

export { ProjectSettings };
