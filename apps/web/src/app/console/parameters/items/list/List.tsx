import React from 'react';
import { Flex } from 'components/grids/v5';

import { ListItem } from './ListItem';
import { ParameterSet } from 'app/models/parameter.model';

interface ListProps {
  items: ParameterSet[];
  on_select: (item: ParameterSet) => void;
}

const List = ({ items, on_select }: ListProps) => {
  const render_item = (item: any, index: number) => (
    <ListItem key={index} index={index + 1} item={item} on_select={on_select} />
  );

  return (
    <Flex direction={Flex.V} class_name="report-history-list">
      <div className="report-list-item">
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}>
            Nro
          </Flex.Item>
          <Flex.Item flex={10}>
            Parametro de calculo
          </Flex.Item>
          <Flex.Item flex={3}>
            Fecha de creación
          </Flex.Item>
        </Flex>
      </div>
      {items.map(render_item)}
    </Flex>
  );
};



export { List };
