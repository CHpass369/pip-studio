import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'components/grids/v5';

import { ListItem } from './ListItem';

const List = ({ items, on_select }) => {
  const render_item = (item, index) => (
    <ListItem key={index} index={index + 1} item={item} on_select={on_select} />
  );

  return (
    <Flex direction={Flex.V} class_name="report-history-list">
      <Flex.Scrap class_name="report-list-item">
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}>
            Nro
          </Flex.Item>
          <Flex.Item flex={3}>
            Fecha
          </Flex.Item>
          <Flex.Item flex={2}>
            Nro Factura
          </Flex.Item>
          <Flex.Item flex={3}>
            Autorización
          </Flex.Item>
          <Flex.Item flex={2}>
            CI/NIT
          </Flex.Item>
          <Flex.Item flex={5}>
            Razon social
          </Flex.Item>
          <Flex.Item flex={3}>
            Codigo de control
          </Flex.Item>
          <Flex.Item flex={2}>
            Precio
          </Flex.Item>
        </Flex>
      </Flex.Scrap>
      {items.map(render_item)}
    </Flex>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  on_select: PropTypes.func.isRequired,
};

export { List };
