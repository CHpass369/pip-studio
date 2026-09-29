import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'components/grids/v5';

import { ListItem } from './ListItem';
import { Circle } from 'components/elements/v2';

const List = ({ items, on_select }) => {
  const render_item = (item, index) => (
    <ListItem key={index} item={item} on_select={on_select} />
  );

  return (
    <Flex direction={Flex.V} class_name="report-history-list">
      <Flex.Scrap class_name="report-list-item">
        <Flex direction={Flex.H}>
          <Flex.Scrap>
            <Circle active />
          </Flex.Scrap>
          <Flex.Item flex={1}>
            #
          </Flex.Item>
          <Flex.Item flex={3}>
            Fecha
          </Flex.Item>
          <Flex.Item flex={2}>
            Encargado
          </Flex.Item>
          <Flex.Item flex={2}>
            Factura #
          </Flex.Item>
          <Flex.Item flex={2}>
            CI/NIT
          </Flex.Item>
          <Flex.Item flex={3}>
            Cliente
          </Flex.Item>
          <Flex.Item flex={5}>
            Descripción
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
