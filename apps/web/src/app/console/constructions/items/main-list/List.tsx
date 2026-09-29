import React from 'react';
import { Flex } from 'components/grids/v5';

import { ListItem } from './ListItem';
import { Construction } from 'app/models/construction.model';

interface ListProps {
  items: Construction[];
  on_select: (item: Construction) => void;
  get_measure: (measure_id: string) => string;
}

const List = ({ items, on_select, get_measure }: ListProps) => {
  const render_item = (item: Construction, index: number) => (
    <ListItem 
      key={index} 
      index={index + 1} 
      item={item} 
      on_select={on_select}
      get_measure={get_measure}
    />
  );

  return (
    <div className="report-history-list">
      <div className="report-list-item">
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}>Nro</Flex.Item>
          <Flex.Item flex={3}>Nombre</Flex.Item>
          <Flex.Item flex={2}>Unidad</Flex.Item>
          {/* <Flex.Item flex={2}>Precio</Flex.Item> */}
          {/* <Flex.Item flex={3}>Materiales</Flex.Item>
          <Flex.Item flex={3}>Mano de obra</Flex.Item>
          <Flex.Item flex={3}>Herramientas y equipo</Flex.Item> */}
          <Flex.Item flex={2}>Fecha</Flex.Item>
        </Flex>
      </div>
      {items.map(render_item)}
    </div>
  );
};

export { List };
