import React, { Activity, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Tab, Tabs  } from '@mui/material';
import { useDispatch } from 'react-redux';

import { toast } from 'generics/services/v4';
import { Flex } from 'components/grids/v5';
import app_service from 'app/api/v1';
import actions from 'store/actions/console';

import { service } from '../services';
import { ProjectSettings } from './details/ProjectSettings';
import { ProjectModules } from './details/ProjectModules';
import { set_materials, set_tools, set_workers, set_constructions, set_measures } from 'store/slices/project.slice';
import { ProjectGeneral } from './details/ProjectGeneral';
import { ProjectParameters } from './details/ProjectParameters';
import { ProjectTotal } from './ProjectTotal';
import { ProjectReports } from './details/ProjectReports';
import { ProjectPrices } from './details/ProjectPrices';
import { Area } from 'administrator/models/area.model';

interface GItemProps {
  area: Area;
  clone?: boolean;
}

const GItem = ({ area }: GItemProps) => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const [steps, set_steps] = useState('1');

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

    app_service.constructions.find(params)
    .then(({ data }) => {
      dispatch(set_constructions(data));
    })
    .catch(toast.api_danger);
    app_service.measures.find({ area_id: area._id })
    .then(({ data }) => {
      dispatch(set_measures(data));
    })
    .catch(toast.api_danger);
  }, [area, dispatch]);

  useEffect(() => {
    service.get_by_id(_id as string)
    .then(({ data }) => {
      dispatch(actions.project.set_project(data));
    })
    .catch(toast.api_danger);
  }, [area, _id, dispatch]);

  const on_change_steps = (_event: React.SyntheticEvent, new_value: string) => {
    set_steps(new_value);
  };

  return (
    <Flex class_name="text-separator">
      <Flex.Scrap>
        <Flex direction={Flex.H}>
          <Flex.Item>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={steps} onChange={on_change_steps}>
                <Tab label="General" value="1" />
                <Tab label="Precios" value="2" />
                <Tab label="Modulos" value="3" />
                <Tab label="Reportes" value="4" />
                <Tab label="Parametros" value="5" />
                <Tab label="Configuración" value="6" />
              </Tabs>
            </Box>
          </Flex.Item>
          <ProjectTotal />
        </Flex>
      </Flex.Scrap>
      <Flex.Item>
        {
          steps === '1' && (
            <ProjectGeneral area={area} />
          )
        }
        {
          steps === '2' && (
            <ProjectPrices area={area} />
          )
        }
        {
          steps === '3' && (
            <ProjectModules area={area} />
          )
        }
        {/* <Activity mode={steps === '3' ? 'visible' : 'hidden'}>
          <ProjectModules area={area} />
        </Activity> */}
        {
          steps === '4' && (
            <ProjectReports area={area} />
          )
        }
        <Activity mode={steps === '5' ? 'visible' : 'hidden'}>
          <ProjectParameters area={area} />
        </Activity>
        <Activity mode={steps === '6' ? 'visible' : 'hidden'}>
          <ProjectSettings area={area} />
        </Activity>
      </Flex.Item>
    </Flex>
  );
};

export { GItem };
