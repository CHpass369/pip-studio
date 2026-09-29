import React from 'react';
import { Flex } from 'components/grids/v5';

import { ListItem, GeneralItem, GeneralTotals } from './ListItem';
import { Label } from 'components/labels/v1';

interface ListProps {
  items: GeneralItem[];
  on_select: (item: GeneralItem) => void;
  totals: GeneralTotals;
}

const List = ({ items, on_select, totals }: ListProps) => {
  const render_item = (item: GeneralItem, index: number) => (
    <ListItem 
      key={index} 
      index={index + 1} 
      item={item} 
      on_select={on_select}
    />
  );

  return (
    <Flex direction={Flex.V} class_name="report-history-list">
      <Flex.Scrap class_name="report-list-item">
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}>Nro</Flex.Item>
          <Flex.Item flex={5}>Descripción</Flex.Item>
          <Flex.Item flex={1}>Unidad</Flex.Item>
          <Flex.Item flex={2}>Cantidad</Flex.Item>
          <Flex.Item flex={2}>Unitario</Flex.Item>
          <Flex.Item flex={2}>Parcial</Flex.Item>
          <Flex.Item flex={2}>Materiales</Flex.Item>
          <Flex.Item flex={2}>Obrero</Flex.Item>
          <Flex.Item flex={2}>Equipo</Flex.Item>
          <Flex.Item flex={2}>Modulo</Flex.Item>
          <Flex.Item flex={2}>Inicio</Flex.Item>
          <Flex.Item flex={2}>Fin</Flex.Item>
        </Flex>
      </Flex.Scrap>
      {items.map(render_item)}
      <Flex.Scrap class_name="report-list-item">
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}></Flex.Item>
          <Flex.Item flex={5}></Flex.Item>
          <Flex.Item flex={1}></Flex.Item>
          <Flex.Item flex={2}></Flex.Item>
          <Flex.Item flex={2}>Total</Flex.Item>
          <Flex.Item flex={2}><Label.BsCoin value={totals.sub_total} /></Flex.Item>
          <Flex.Item flex={2}><Label.BsCoin value={totals.materials_price} /></Flex.Item>
          <Flex.Item flex={2}><Label.BsCoin value={totals.workers_price} /></Flex.Item>
          <Flex.Item flex={2}><Label.BsCoin value={totals.tools_price} /></Flex.Item>
          <Flex.Item flex={2}></Flex.Item>
          <Flex.Item flex={2}></Flex.Item>
          <Flex.Item flex={2}></Flex.Item>
        </Flex>
      </Flex.Scrap>
    </Flex>
  );
};

export { List };
