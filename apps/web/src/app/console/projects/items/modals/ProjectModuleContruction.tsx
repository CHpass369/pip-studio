import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Flex } from 'components/grids/v5';
import { Button, TextField, Modal } from '@mui/material';

import { toast } from 'generics/services/v4';
import { ContentTitle } from 'components/titles/v3';
import { BUTTON_LABELS } from 'components/generics/v2';

import { service } from '../../services';
import { ROUTE, } from '../../constants';
import { GItem } from '../../../constructions/items/GItem';
import actions from 'store/actions/console';
import { ConstructionCreate } from 'app/console/constructions/items/ConstructionCreate';
import { useDispatch, useSelector } from 'react-redux';

import './ProjectModuleEstructure.scss';
import { calculate_unit_price } from 'app/console/calc_parameters/calculator';
import { populate_construction_totals } from '../../defaultModuleData';
import { ProjectConstruction } from 'app/models/project.model';

export const ITEM_HEADER = {
  context: 'Projectos',
  title: 'Creación de Proyectos',
};

/**
 * Finds a specific construction object within a project structure based on module and construction IDs.
 * @param {object} project - The full project object (from state).
 * @param {string} moduleId - The ID of the target module.
 * @param {string} constructionId - The ID of the target construction.
 * @returns {object | null} The found construction object, or null if not found.
 */
const findConstructionObject = (project: any, moduleId: any, constructionId: any) => {
  if (!project || !project.modules) return null;

  for (const module of project.modules) {
    // Check if the current module matches the target module ID
    if (module._id === moduleId) {
      const constructions = module.constructions;
      if (Array.isArray(constructions)) {
        // Find the specific construction within this module's array
        return constructions.find(c => c._id === constructionId) || null;
      }
    }
  }
  return null;
};

interface ProjectModuleContructionProps {
  open: boolean;
  set_open: (open: boolean) => void;
  module_id: string;
  construction?: ProjectConstruction;
}

const ProjectModuleContruction = ({ open, set_open, module_id, construction }: ProjectModuleContructionProps) => {
  const dispatch = useDispatch();
  const { area } = useSelector((state: any) => state.apps);
  const project = useSelector((state: any) => state.project);

  const on_update = (item: any) => {
    set_open(false);

    dispatch(actions.project.update_construction(
      module_id,
      populate_construction_totals(project.parameters, item),
    ));
  };

  const on_cancel = () => {
    set_open(false);
  };

  if (!construction) return;
  
  return (
    <Modal open={open} onClose={() => set_open(false)}>
      <Flex class_name="dialog-module-structure-flex text-separator">
        <Flex.Item>
          <ConstructionCreate
            area={area} 
            parameters={project.parameters}
            construction={{ ...construction }}
            on_update={on_update}
            on_cancel={on_cancel}
          />
        </Flex.Item>
      </Flex>
    </Modal>
  );
};

export { ProjectModuleContruction };
