import React from 'react';

import { Flex } from 'components/grids/v5';

import { ListItem } from './ListItem';

interface ListProps {
  items: any[];
  on_select: (item: any) => void;
}

const List = ({ items, on_select }: ListProps) => {
  const render_item = (item, index) => (
    <ListItem key={index} item={item} on_select={on_select} />
  );

  return (
    <Flex direction={Flex.V} class_name="report-history-list">
      <Flex.Scrap class_name="report-list-item">
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}>
            Indice
          </Flex.Item>
          <Flex.Item flex={2}>
            Origen
          </Flex.Item>
          <Flex.Item flex={3}>
            Encargado
          </Flex.Item>
          <Flex.Item flex={3}>
            Razon social
          </Flex.Item>
          <Flex.Item flex={5}>
            Descripción
          </Flex.Item>
          <Flex.Item flex={2}>
            Precio
          </Flex.Item>
          <Flex.Item flex={2}>
            Pagado
          </Flex.Item>
          <Flex.Item flex={3}>
            Fecha
          </Flex.Item>
        </Flex>
      </Flex.Scrap>
      {items.map(render_item)}
    </Flex>
  );
};

export { List };
