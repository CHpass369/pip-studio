import React from 'react';
import { Flex } from 'components/grids/v5';

import { ListItem } from './ListItem';
import { Project } from 'app/models/project.model';

interface ListProps {
  items: Project[];
  on_select: (item: Project) => void;
  on_clone: (item: Project) => void;
  on_delete: (item: Project) => void;
  on_lock: (item: Project) => void;
}

const List = ({ items, on_select, on_clone, on_delete, on_lock }: ListProps) => {
  const render_item = (item: Project, index: number) => (
    <ListItem
      key={index}
      index={index + 1}
      item={item}
      on_select={on_select}
      on_clone={on_clone}
      on_delete={on_delete}
      on_lock={on_lock}
    />
  );

  return (
    <Flex direction={Flex.V} class_name="report-history-list">
      <div className="report-list-item">
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}>Nro</Flex.Item>
          <Flex.Item flex={5}>Nombre</Flex.Item>
          <Flex.Item flex={2}>Precio</Flex.Item>
          <Flex.Item flex={2}>Inicio</Flex.Item>
          <Flex.Item flex={2}>Fin</Flex.Item>
          <Flex.Item flex={1}></Flex.Item>
        </Flex>
      </div>
      {items.map(render_item)}
    </Flex>
  );
};

export { List };
