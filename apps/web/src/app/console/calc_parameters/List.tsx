import React from 'react';
import { Flex } from 'components/grids/v5';

import { ListItem } from './ListItem';
import { Parameter } from 'app/models/parameter.model';

interface ListProps {
  items: Parameter[];
  budget: number[];
  on_change: (parameter: Parameter) => void;
  display_parcial: boolean;
}

const List = ({ items, budget, on_change, display_parcial }: ListProps) => {
  
  const render_item = (item: Parameter, index: number) => (
    <ListItem key={index} index={index} item={item} budget={budget} on_change={on_change} display_parcial={display_parcial} />
  );

  return (
    <Flex direction={Flex.V} class_name="report-history-list">
      <Flex.Scrap class_name="report-list-item">
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}>
            N
          </Flex.Item>
          <Flex.Item flex={6}>
            Parametros de calculo
          </Flex.Item>
          {
            !display_parcial || (
              <Flex.Item flex={2}>
                Parcial
              </Flex.Item>
            )
          }
          <Flex.Item flex={1}>
            Es Total
          </Flex.Item>
          <Flex.Item flex={1}>
            %
          </Flex.Item>
          <Flex.Item flex={1}>
            Fórmula
          </Flex.Item>
        </Flex>
      </Flex.Scrap>
      {items.map(render_item)}
    </Flex>
  );
};

export { List };
