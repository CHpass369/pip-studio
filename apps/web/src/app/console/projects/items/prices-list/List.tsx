import React from 'react';
import { Flex } from 'components/grids/v5';

import { ListItem, PriceItem, PriceUpdate } from './ListItem';

interface ListProps {
  items: PriceItem[];
  on_update: PriceUpdate;
}

const List = ({ items, on_update }: ListProps) => {
  const render_item = (item: PriceItem, index: number) => (
    <ListItem
      key={index}
      item={item}
      on_update={on_update}
    />
  );

  return (
    <Flex direction={Flex.V} class_name="report-history-list">
      <Flex.Scrap class_name="report-list-item">
        <Flex direction={Flex.H}>
          <Flex.Item flex={5}>Material</Flex.Item>
          <Flex.Item flex={2}>Precio de mercado</Flex.Item>
          <Flex.Item flex={2}>Cantidad</Flex.Item>
          <Flex.Item flex={2}>Total</Flex.Item>
          <Flex.Item flex={2}>Actualizar</Flex.Item>
          <Flex.Item flex={2}>Precio de proyecto</Flex.Item>
          <Flex.Item flex={2}>Cantidad</Flex.Item>
          <Flex.Item flex={2}>Total</Flex.Item>
        </Flex>
      </Flex.Scrap>
      {items.map(render_item)}
    </Flex>
  );
};

export { List };
