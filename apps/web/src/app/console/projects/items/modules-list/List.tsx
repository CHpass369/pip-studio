import React from 'react';
import { Flex } from 'components/grids/v5';

import { ListItem } from './ListItem';
import { ProjectModule } from 'app/models/project.model';

import './List.scss';

interface ListProps {
  items: ProjectModule[];
  on_select: (item: ProjectModule) => void;
}

const List = ({ items, on_select }: ListProps) => {

  const render_item = (item: ProjectModule, index: number) => (
    <ListItem 
      key={index} 
      index={index + 1}
      item={item} 
      on_select={on_select}
    />
  );

  return (
    <Flex direction={Flex.V} class_name="report-history-list form-base">
      {items.map(render_item)}
    </Flex>
  );
};

export { List };
