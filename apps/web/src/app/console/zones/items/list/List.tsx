import React from 'react';
import { Flex } from 'components/grids/v5';

import { ListItem } from './ListItem';
import { Zone } from 'app/models/zone.model';

interface ListProps {
  loading?: boolean;
  items: Zone[];
  on_select: (item: Zone) => void;
}

const List = ({ items, loading, on_select }: ListProps) => {
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
            Zona
          </Flex.Item>
          <Flex.Item flex={6}>
            Descripción
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
