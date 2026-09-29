import React from 'react';
import { Flex } from 'components/grids/v5';

import { ListItem } from './ListItem';
import { Resource } from 'app/models/resource.model';

interface ListProps {
  items: Resource[];
  on_select: (item: Resource) => void;
}

const List = ({ items, on_select }: ListProps) => {
  const render_item = (item: any, index: number) => (
    <ListItem key={index} index={index + 1} item={item} on_select={on_select} />
  );

  return (
    <div className="report-history-list">
      <div className="report-list-item">
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}>
            Nro
          </Flex.Item>
          <Flex.Item flex={6}>
            Nombre
          </Flex.Item>
          <Flex.Item flex={2}>
            Valor
          </Flex.Item>
          <Flex.Item flex={3}>
            Fecha de creación
          </Flex.Item>
        </Flex>
      </div>
      {items.map(render_item)}
    </div>
  );
};



export { List };
