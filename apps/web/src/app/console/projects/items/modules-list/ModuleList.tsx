import React, { useState } from 'react';
import { Flex } from 'components/grids/v5';

import { ModuleListItem } from './ModuleListItem';
import { ProjectModuleContruction } from '../modals/ProjectModuleContruction';
import { ProjectConstruction } from 'app/models/project.model';

interface ModuleListProps {
  module_id: string;
  items: ProjectConstruction[];
}

const ModuleList = ({ module_id, items }: ModuleListProps) => {
  const [open, set_open] = useState(false);
  const [item, set_item] = useState<ProjectConstruction | null>(null);

    const on_select = (item: ProjectConstruction) => {
      set_open(true);
      set_item(item);
    };

  const render_item = (item: ProjectConstruction, index: number) => (
    <ModuleListItem 
      key={index} 
      index={index + 1}
      module_id={module_id}
      item={item} 
      on_select={on_select}
    />
  );

  return (
    <Flex direction={Flex.V} class_name="report-history-list">
      <Flex.Scrap class_name="report-list-item">
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}>Nro</Flex.Item>
          <Flex.Item flex={3}>Descripción</Flex.Item>
          <Flex.Item flex={1}>Unid.</Flex.Item>
          <Flex.Item flex={2}>Parcial</Flex.Item>
          <Flex.Item flex={2}>Unitario</Flex.Item>
          <Flex.Item flex={2}>Precio</Flex.Item>
          <Flex.Item flex={2}>Cantidad</Flex.Item>
          <Flex.Item flex={2}>Modificado</Flex.Item>
          <Flex.Item flex={2}></Flex.Item>
        </Flex>
      </Flex.Scrap>
      {items.map(render_item)}
      <div>
        {item && (
          <ProjectModuleContruction open={open} set_open={set_open} module_id={module_id} construction={item} />
        )}
      </div>
    </Flex>
  );
};

export { ModuleList };
