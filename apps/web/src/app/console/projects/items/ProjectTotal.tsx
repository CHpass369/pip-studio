import React from 'react';
import { useSelector } from 'react-redux';

import { Flex } from 'components/grids/v5';
import { project_total } from '../defaultModuleData';
import { Label } from 'components/labels/v1';

import './ProjectTotal.scss';

const ProjectTotal = () => {
  const project = useSelector((state: any) => state.project);
  
  const new_total = project_total(project);
  if (!project.currency) return;

  return (
    <Flex.Scrap class_name="project-total">
      <div>
        Total $us <Label.Rounding value={new_total / project.currency_value } />
      </div>
      <div>
        Total Bs <Label.Rounding value={new_total} />
      </div>
    </Flex.Scrap>
  );
};

export { ProjectTotal };
