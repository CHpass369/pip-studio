import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useNavigate } from 'react-router';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { Search } from 'components/elements/v2';
import { SuperLinearList } from 'components/lists/v2';
import { ConfirmationDialog } from 'components/generics/v2';
import { toast } from 'generics/services/v4';
import { Title, EmptyInfo } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import actions from 'store/actions/console';

import { List } from '../modules-list/List';
import { set_module_id, set_copied_module } from 'store/slices/project.slice';
import { service } from '../../services';
import { ROUTE } from '../../constants';
import { createDefaultModule, duplicate_module, populate_construction_totals } from '../../defaultModuleData';
import { Area } from 'administrator/models/area.model';
import { Resource, ResourceLine } from 'app/models/resource.model';
import { Construction } from 'app/models/construction.model';
import { ProjectConstructionBase } from 'app/models/project.model';

const EMPTY_LIST_MESSAGE = 'No existe modulos registradas';

interface ProjectModulesProps {
  area: Area;
}

const ProjectModules = ({ area }: ProjectModulesProps) => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state: any) => state.project);
  const { module_id, materials, workers, tools, constructions, copied_module } = useSelector((state: any) => state.project_assets);
  const [s_constructions, set_s_constructions] = useState<Construction[]>([]);
  const [pending_construction, set_pending_construction] = useState<Construction | null>(null);

  const on_new_module = () => {
    dispatch(actions.project.module_new(createDefaultModule()));
  };

  const on_paste_module = () => {
    dispatch(actions.project.module_new(duplicate_module(copied_module)));
  };

  const on_select = useCallback((data: any) => {    
    dispatch(set_module_id(data._id));
    console.info('select module:', data._id);
  }, [dispatch]);

  const populated_price = (resource: Resource[], items: ResourceLine[]) => {
    const result = [ ...items ];
    return result.reduce((acc, item) => {
      const src = resource.find((src) => src._id === item._id);
      
      if (src) {
        acc.push({
          _id: src._id,
          price: src.price,
          quantity: item.quantity,
          created: new Date().toISOString(),
        });
      }
      return acc;
    }, [] as ResourceLine[]);
  };

  const on_construction = useCallback((data: Construction) => {
    set_pending_construction(data);
  }, []);

  const on_confirm_construction = useCallback(() => {
    if (!pending_construction) {
      throw new Error('pending_construction is undefined');
    }
    const data = pending_construction;
    const new_construction: ProjectConstructionBase = {
      _id: uuidv4(),
      area_id: area._id,
      construction_id: data._id,
      name: data.name,
      materials_price: 0,
      tools_price: 0,
      workers_price: 0,
      price: 0,
      // materials_price: data.materials.reduce((acc, o) => acc + o.price, 0),
      // tools_price: data.tools.reduce((acc, o) => acc + o.price, 0),
      // workers_price: data.workers.reduce((acc, o) => acc + o.price, 0),
      // price: calculate_unit_price(project.parameters, data),
      measure_id: data.measure_id,
      quantity: 1,
      metric_calculation: null,
      is_critical: false,
      materials: populated_price(materials, data.materials),
      workers: populated_price(workers, data.workers),
      tools: populated_price(tools, data.tools),
      created: new Date().toISOString(),
    };

    dispatch(actions.project.new_construction(
      module_id,
      populate_construction_totals(project.parameters, new_construction),
    ));
    set_pending_construction(null);
  }, [pending_construction, module_id, area, project, materials, workers, tools, dispatch]);

  const on_cancel_construction = useCallback(() => {
    set_pending_construction(null);
  }, []);

  const on_update = useCallback((e: any) => {
    e.preventDefault();
    const data = {
      ...project,
    };
    service.update(_id as string, data)
    .then(() => {
      navigate(ROUTE.LIST);
    })
    .catch(toast.api_danger);
  }, [_id, project, navigate]);
  
  const on_search = useCallback((search: string) => {
    set_s_constructions(
      constructions.filter(data => data.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 30)
    );
  }, [constructions]);

  useEffect(() => {
    set_s_constructions([ ...constructions.slice(0, 30) ]);
  }, [constructions]);

  const convert = (item: any) => ({
    name: item.name || 'Not found',
    description: item.description || 'Not found',
  });

  return (
    <Flex class_name="text-separator">
      <Flex.Item>
        <Flex direction={Flex.H}>
          <Flex.Item flex={2}>
            <Flex.Buttoms>

              <Button variant="contained" onClick={on_new_module}>Nuevo modulo</Button>
              {!!copied_module && <Button variant="contained" onClick={on_paste_module}>Pegar modulo</Button>}
              {/* <Button variant="contained" onClick={on_update}>Guardar</Button> */}
            </Flex.Buttoms>
            <Flex.Content>
              {(project.modules.length === 0) && <EmptyInfo description={EMPTY_LIST_MESSAGE} />}
              {(project.modules.length > 0) && <List items={project.modules} on_select={on_select} />}
            </Flex.Content>
          </Flex.Item>
          <Flex.Item flex={1}>
            <Search on_search={on_search} />
            <Flex.Scrap>
              <Title value="Lista de items" />
              <SuperLinearList items={s_constructions} convert={convert} on_select={on_construction} />
            </Flex.Scrap>
          </Flex.Item>
        </Flex>
      </Flex.Item>
      <ConfirmationDialog
        open={!!pending_construction}
        title="Confirmar selección"
        message={`¿Deseas agregar "${pending_construction?.name}" al modulo?`}
        on_confirm={on_confirm_construction}
        on_cancel={on_cancel_construction}
      />
    </Flex>
  );
};

export { ProjectModules };
