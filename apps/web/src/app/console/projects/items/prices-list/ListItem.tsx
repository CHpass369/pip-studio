import React from 'react';
import { Flex } from 'components/grids/v5';
import { Label } from 'components/labels/v1';
import { Button } from '@mui/material';
import { ResourceLine } from 'app/models/resource.model';
import { ProjectConstruction } from 'app/models/project.model';

export interface PriceSeparator {
  kind: 'separator';
  label: string;
}

export interface PriceMaterial {
  kind: 'material';
  name: string;
  quantity: number;
  market_price: number;
  market_total: number;
  project_price: number;
  project_total: number;
  module_id: string;
  construction: ProjectConstruction;
  material_entry: ResourceLine;
}

export type PriceItem = PriceSeparator | PriceMaterial;

export type PriceUpdate = (module_id: string, construction: ProjectConstruction, material_entry: ResourceLine, market_price: number) => void;

interface ListItemProps {
  item: PriceItem;
  on_update: PriceUpdate;
}

const ListItem = ({ item, on_update }: ListItemProps) => {
  if (!item) {
    throw new Error('item is undefined');
  }

  if (item.kind === 'separator') {
    return (
      <Flex.Scrap class_name="report-list-item prices-list-separator">
        <Flex direction={Flex.H}>
          <Flex.Item flex={19}>{item.label}</Flex.Item>
        </Flex>
      </Flex.Scrap>
    );
  }

  const is_different = item.market_price !== item.project_price;

  const on_click = () => {
    on_update(item.module_id, item.construction, item.material_entry, item.market_price);
  };

  return (
    <Flex.Scrap class_name="report-list-item">
      <Flex direction={Flex.H}>
        <Flex.Item flex={5}>{item.name}</Flex.Item>
        <Flex.Item flex={2} class_name={is_different ? 'prices-diff' : ''}>
          <Label.BsCoin value={item.market_price} />
        </Flex.Item>
        <Flex.Item flex={2}><Label.Rounding value={item.quantity} /></Flex.Item>
        <Flex.Item flex={2} class_name={is_different ? 'prices-diff' : ''}>
          <Label.BsCoin value={item.market_total} />
        </Flex.Item>
        <Flex.Item flex={2}>
          <Button size="small" variant="outlined" disabled={!is_different} onClick={on_click}>
            Actualizar
          </Button>
        </Flex.Item>
        <Flex.Item flex={2} class_name={is_different ? 'prices-diff' : ''}>
          <Label.BsCoin value={item.project_price} />
        </Flex.Item>
        <Flex.Item flex={2}><Label.Rounding value={item.quantity} /></Flex.Item>
        <Flex.Item flex={2} class_name={is_different ? 'prices-diff' : ''}>
          <Label.BsCoin value={item.project_total} />
        </Flex.Item>
      </Flex>
    </Flex.Scrap>
  );
};

export { ListItem };
