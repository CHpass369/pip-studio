import React, { Activity, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button, TextField, Box, Select, MenuItem, Tab, Tabs, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { Search } from 'components/elements/v2';
import { SuperLinearList } from 'components/lists/v2';
import { BUTTON_LABELS, ConfirmationDialog, RemoveDialog } from 'components/generics/v2';
import { toast } from 'generics/services/v4';
import { ContentTitle, EmptyInfo, Title } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import { useFormReducer } from 'generics/functions/forms/v2';
import app_service from 'app/api/v1';
import { List } from './editable-list/List';
import { set_materials, set_tools, set_workers } from 'store/slices/project.slice';

import { service } from '../services';
import { EMPTY_LIST_MESSAGE, ITEM_HEADER, ROUTE } from '../constants';
import { CalcParameters } from 'app/console/calc_parameters/CalcParameters';
import { ConstructionTotal } from 'app/console/projects/items/ConstructionTotal';
import { construction_total_course } from 'app/console/calc_parameters/calculator';
import { Suggestion } from './Suggestion';
import { Area } from 'administrator/models/area.model';
import { Measure } from 'app/models/measure.model';
import { Resource, ResourceLine, ResourceType } from 'app/models/resource.model';
import { Parameter } from 'app/models/parameter.model';
import { Construction } from 'app/models/construction.model';

type ConstructionForm = Omit<Construction, '_id'> & { _id?: string };

interface PendingSelection {
  type: ResourceType;
  data: Resource;
}

const PAGE_SIZE = 30;
const default_especification = {
  definition: '',
  equipment: 'El contratista suministrará todos los materiales, herramientas y equipo necesarios para ejecutar este item.',
  procedure: '',
  measurement: 'El {{name}} será medido en {{measure}}.',
  payment: 'Los trabajos ejecutados en un todo de acuerdo con estas especificaciones, medidos según lo previsto en el punto anterior, serán pagados al precio unitario establecido en la propuesta aceptada, dicho precio será compensación total por todos los trabajos, materiales, herramientas, equipo, transporte, mano de obra y otros gastos directos o indirectos que incidan en su construcción.',
};


interface ConstructionCreateProps {
  area: Area;
  construction?: any; // a construction or a project construction
  parameters: Parameter[];
  on_update: (item: ConstructionForm) => void;
  on_cancel: () => void;
}

const ConstructionCreate = ({ area, construction, parameters, on_update, on_cancel }: ConstructionCreateProps) => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [is_new] = useState(_id === undefined);
  const [is_construction, set_is_construction] = useState(false);
  const [steps, set_steps] = useState('1');
  const [value, setValue] = React.useState('1');

  const [measures, set_measures] = useState<Measure[]>([]);
  const [s_tools, set_s_tools] = useState<Resource[]>([]);
  const [s_materials, set_s_materials] = useState<Resource[]>([]);
  const [s_workers, set_s_workers] = useState<Resource[]>([]);
  const [pending_selection, set_pending_selection] = useState<PendingSelection | null>(null);
  const { materials, workers, tools } = useSelector((state: any) => state.project_assets);
  
  const {
    item,
    set_item,
    on_string_change,
  } = useFormReducer<ConstructionForm>({
    area_id: area._id,
    name: '',
    price: 0,
    measure_id: '',
    description: '',
    tools: [],
    materials: [],
    workers: [],
    especifications: default_especification,
  });
  const [ totals, set_totals ] = useState({
    tools: 0,
    materials: 0,
    workers: 0,
  });

  const create = () => {
    const data = {
      ...item,
    };
    service.create(data)
    .then(() => {
      navigate(ROUTE.LIST);
    })
    .catch(toast.api_danger);
  };

  const update = () => {
    const data = {
      ...item,
    };
    service.update(_id as string, data)
    .then(() => {
      navigate(ROUTE.LIST);
    })
    .catch(toast.api_danger);
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
    const prices = {
      materials: construction_total_course(item.materials, materials, is_construction),
      tools: construction_total_course(item.tools, tools, is_construction),
      workers: construction_total_course(item.workers, workers, is_construction),
    };
    set_totals(prices);
  }, [is_construction, item, set_totals, materials, tools, workers]);

  const on_search = useCallback((search?: string) => {
    const params: Record<string, any> = { area_id: area._id };
    if (search) {
      params.search = search;
    }

    app_service.tools.find_by({ page: 1, limit: PAGE_SIZE }, params)
    .then(({ data }) => {
      set_s_tools(data);
    })
    .catch(toast.api_danger);
    app_service.workers.find_by({ page: 1, limit: PAGE_SIZE }, params)
    .then(({ data }) => {
      set_s_workers(data);
    })
    .catch(toast.api_danger);
    app_service.materials.find_by({ page: 1, limit: PAGE_SIZE }, params)
    .then(({ data }) => {
      set_s_materials(data);
    })
    .catch(toast.api_danger);
  }, [area]);

  useEffect(() => {
      on_search();
      if (is_new) return;
      if (construction) {
        set_item({
          ...construction,
          especifications: construction.especifications || default_especification,
        });
        set_is_construction(true);
        return;
      }
      service.get_by_id(_id as string)
      .then(({ data }) => {
        data.materials = data.materials || [];
        data.tools = data.tools || [];
        data.workers = data.workers || [];
        data.especifications = data.especifications || default_especification;
        set_item(data);
      })
      .catch(toast.api_danger);
  }, [area, construction, is_new, _id, set_item]);

  const on_measure_change = (event: SelectChangeEvent) => {
    set_item({ ...item, measure_id: event.target.value });
  };

  const on_especification_change = (event: any) => {
    if (!event) {
      throw new Error('event is undefined');
    }
    const { name, value } = event.target;
    set_item({
      ...item,
      especifications: { ...item.especifications, [name]: value },
    });
  };

  useEffect(() => {
    const params: Record<string, any> = { area_id: area._id };

    app_service.tools.find(params)
    .then(({ data }) => {
      dispatch(set_tools(data));
    })
    .catch(toast.api_danger);
    app_service.workers.find(params)
    .then(({ data }) => {
      dispatch(set_workers(data));
    })
    .catch(toast.api_danger);
    app_service.materials.find(params)
    .then(({ data }) => {
      dispatch(set_materials(data));
    })
    .catch(toast.api_danger);
    app_service.measures.find({ area_id: area._id })
    .then(({ data }) => {
      set_measures(data);
    })
    .catch(toast.api_danger);
  }, [area, dispatch]);

  const toggleTool = (data: Resource) => {
    const material = item.tools.find((item) => item._id === data._id);
    if (material) {
      toast.warning('El material ya esta seleccionado.');
    } else {
      set_pending_selection({ type: 'tools', data });
    }
  };

  const toggleMaterial = (data: Resource) => {
    const material = item.materials.find((item) => item._id === data._id);
    if (material) {
      toast.warning('El material ya esta seleccionado.');
    } else {
      set_pending_selection({ type: 'materials', data });
    }
  };

  const toggleWorker = (data: Resource) => {
    const material = item.workers.find((item) => item._id === data._id);
    if (material) {
      toast.warning('El material ya esta seleccionado.');
    } else {
      set_pending_selection({ type: 'workers', data });
    }
  };

  const on_confirm_selection = () => {
    if (!pending_selection) {
      throw new Error('pending_selection is undefined');
    }
    const { type, data } = pending_selection;
    item[type].push({
      _id: data._id,
      price: 0,
      quantity: 1,
      created: new Date().toISOString(),
    });

    set_item({ ...item, [type]: item[type] });
    set_pending_selection(null);
  };

  const on_cancel_selection = () => {
    set_pending_selection(null);
  };

  const convert = (item: { name?: string; description?: string }) => ({
    name: item.name || 'Not found',
    description: item.description || 'Not found',
  });

  const renderButtons = () => {
    if (construction) {
      return(
        <>
          <Button variant="outlined" onClick={on_cancel}>Cancelar</Button>
          <Button variant="contained" onClick={() => { on_update(item) }}>{BUTTON_LABELS.UPDATE}</Button>
        </>
      );
    }
    if (is_new) {
      return (
        <>
          <Button variant="outlined" onClick={on_cancel}>Cancelar</Button>
          <Button variant="contained" onClick={on_submit}>{BUTTON_LABELS.CREATE}</Button>
        </>
      );
    }

    return (
      <>
        <Button variant="outlined" onClick={on_cancel}>Cancelar</Button>
        <RemoveDialog label={BUTTON_LABELS.REMOVE} on_click={on_remove_callback} />
        <Button variant="contained" onClick={on_submit}>{BUTTON_LABELS.UPDATE}</Button>
      </>
    );
  };

  const render_selection_list = (title: string, items: Resource[], onToggle: (data: Resource) => void) => (
    <Flex.Scrap>
      <Title value={title} />
      <SuperLinearList items={items} convert={convert} on_select={onToggle} />
    </Flex.Scrap>
  );

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const on_select = useCallback((type: ResourceType, resource: ResourceLine) => {
    switch (type) {
      case 'materials':
        item.materials = item.materials.filter((data) => data._id !== resource._id);
        break;
      case 'tools':
        item.tools = item.tools.filter((data) => data._id !== resource._id);
        break;
      case 'workers':
        item.workers = item.workers.filter((data) => data._id !== resource._id);
        break;
      default:
        break;
    }
    set_item({ ...item });
  }, [item, set_item]);

  const on_update_quantity = useCallback((type: ResourceType, resource: ResourceLine) => {
    switch (type) {
      case 'materials':
        set_item({
          ...item,
          materials: item.materials.map((data) => data._id === resource._id ? { ...resource } : data)
        });
        break;
      case 'tools':
        set_item({
          ...item,
          tools: item.tools.map((data) => data._id === resource._id ? { ...resource } : data)
        });
        break;
      case 'workers':
        set_item({
          ...item,
          workers: item.workers.map((data) => data._id === resource._id ? { ...resource } : data)
        });
        break;
      default:
        break;
    }
  }, [item, set_item]);

  const on_change = useCallback(() => {
  }, []);

  const on_change_steps = (_event: React.SyntheticEvent, new_value: string) => {
    set_steps(new_value);
  };

  return (
    <Flex class_name="text-separator form-base">
      <ContentTitle config={ITEM_HEADER} />
      <Flex.Scrap>
        <Flex direction={Flex.H}>
          <Flex.Item>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={steps} onChange={on_change_steps}>
                <Tab label="General" value="1" />
                <Tab label="Parametros de calculo" value="2" />
                <Tab label="Especificaciones" value="3" />
              </Tabs>
            </Box>
          </Flex.Item>
          <ConstructionTotal totals={totals} parameters={parameters} />
        </Flex>
      </Flex.Scrap>
      <Flex.Item>
        <Activity mode={steps === '1' ? 'visible' : 'hidden'}>
          {/* <Flex.Item> */}
            <Flex direction={Flex.H}>
              <Flex.Item flex={2}>
                <div>
                {/* <Flex direction={Flex.V}>
                <Flex.Item> */}
                  <Flex.Content>
                    <TextField 
                      fullWidth 
                      name="name" 
                      label="Nombre de la construccion" 
                      value={item.name} 
                      onChange={on_string_change} 
                    />
                    <FormControl fullWidth>
                      <InputLabel id="form-measure-label">Unidad de Medida</InputLabel>
                      <Select
                        fullWidth
                        label="Unidad de Medida"
                        id="form-measure-label"
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
                  </Flex.Content>
                  <Flex.Content>
                    {(item.materials.length === 0) && <EmptyInfo description={EMPTY_LIST_MESSAGE} />}
                    {(item.materials.length > 0) && <List items={item.materials} on_select={on_select} data={materials} type="materials" on_update_quantity={on_update_quantity} is_construction={is_construction} />}
                    {(item.workers.length === 0) && <EmptyInfo description={EMPTY_LIST_MESSAGE} />}
                    {(item.workers.length > 0) && <List items={item.workers} on_select={on_select} data={workers} type="workers" on_update_quantity={on_update_quantity} is_construction={is_construction} />}
                    {(item.tools.length === 0) && <EmptyInfo description={EMPTY_LIST_MESSAGE} />}
                    {(item.tools.length > 0) && <List items={item.tools} on_select={on_select} data={tools} type="tools" on_update_quantity={on_update_quantity} is_construction={is_construction} />}
                  </Flex.Content>
                {/* </Flex.Item>
                </Flex> */}
                </div>
              </Flex.Item>
              <Flex.Item flex={1}>
                <Search on_search={on_search} />
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange}>
                    <Tab label="Materiales" value="1" />
                    <Tab label="Mano de obra" value="2" />
                    <Tab label="Htas. y equipos" value="3" />
                  </Tabs>
                </Box>
                <Activity mode={value === '1' ? 'visible' : 'hidden'}>
                  {render_selection_list(
                    'Materiales', 
                    s_materials,
                    toggleMaterial
                  )}
                </Activity>
                <Activity mode={value === '2' ? 'visible' : 'hidden'}>
                  {render_selection_list(
                    'Mano de obra', 
                    s_workers,
                    toggleWorker
                  )}
                </Activity>
                <Activity mode={value === '3' ? 'visible' : 'hidden'}>
                  {render_selection_list(
                    'Herramientas y equipos', 
                    s_tools,
                    toggleTool
                  )}
                </Activity>
              </Flex.Item>
            </Flex>
          {/* </Flex.Item> */}
        </Activity>
        <Activity mode={steps === '2' ? 'visible' : 'hidden'}>
          <CalcParameters partials={[totals.materials, totals.workers, totals.tools]} items={parameters} on_change={on_change} display_parcial={true} title={false} />
        </Activity>
        <Activity mode={steps === '3' ? 'visible' : 'hidden'}>
          <Flex.Content>
            <Suggestion item={item} measure={measures.find((measure) => item.measure_id === measure._id)} />
            <TextField
              fullWidth
              multiline
              minRows={3}
              name="definition"
              label="Definición"
              value={item.especifications.definition}
              onChange={on_especification_change}
            />
            <TextField
              fullWidth
              multiline
              minRows={3}
              name="equipment"
              label="Materiales, Herramientas y Equipos"
              value={item.especifications.equipment}
              onChange={on_especification_change}
            />
            <TextField
              fullWidth
              multiline
              minRows={3}
              name="procedure"
              label="Procedimiento para la ejecución"
              value={item.especifications.procedure}
              onChange={on_especification_change}
            />
            <TextField
              fullWidth
              multiline
              minRows={3}
              name="measurement"
              label="Medición"
              value={item.especifications.measurement}
              onChange={on_especification_change}
            />
            <TextField
              fullWidth
              multiline
              minRows={3}
              name="payment"
              label="Forma de pago"
              value={item.especifications.payment}
              onChange={on_especification_change}
            />
          </Flex.Content>
        </Activity>
      </Flex.Item>
      <Flex.Buttoms>
        {renderButtons()}
      </Flex.Buttoms>
      <ConfirmationDialog
        open={!!pending_selection}
        title="Confirmar selección"
        message={`¿Deseas agregar "${pending_selection?.data?.name}"?`}
        on_confirm={on_confirm_selection}
        on_cancel={on_cancel_selection}
      />
    </Flex>
  );
};

export { ConstructionCreate };
