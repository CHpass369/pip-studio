import React, { useState } from 'react';
import moment from 'moment';
import { Flex } from 'components/grids/v5';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

import './ListItem.scss';
import { Label } from 'components/labels/v1';
import { is_number } from 'generics/functions/basics';
import { ConfirmationDialog } from 'components/generics/v2';
import { Resource, ResourceLine, ResourceType } from 'app/models/resource.model';

interface ListItemProps {
  index: number;
  item: ResourceLine;
  on_select: (type: ResourceType, item: ResourceLine) => void;
  material?: Resource;
  on_update_quantity: (type: ResourceType, item: ResourceLine) => void;
  type?: ResourceType;
  is_construction?: boolean;
}

const ListItem = ({ index, item, on_select, material = {} as Resource, on_update_quantity, type = 'default' as ResourceType, is_construction = true }: ListItemProps) => {
  const [price, set_price] = useState<any>(item.price);
  const [quantity, set_quantity] = useState<any>(item.quantity);
  const [confirm_remove_open, set_confirm_remove_open] = useState(false);

  const on_click = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.info('on select material');
  };

  const on_remove = (e: any) => {
    e.stopPropagation();
    set_confirm_remove_open(true);
  };

  const on_confirm_remove = (e: any) => {
    e.stopPropagation();
    set_confirm_remove_open(false);
    on_select(type, item);
  };

  const on_cancel_remove = (e: any) => {
    e.stopPropagation();
    set_confirm_remove_open(false);
  };

  const on_quantity_change = (event: any) => {
    event.stopPropagation();
    const value = event.target.value;
    set_quantity(value);

    if (is_number(value)) {
      on_update_quantity(type, { ...item, quantity: parseFloat(value) });
    }
  };

  const on_price_change = (event: any) => {
    event.stopPropagation();
    const value = event.target.value;
    set_price(value);

    if (is_number(value)) {
      on_update_quantity(type, { ...item, price: parseFloat(value) });
    }
  };

  return (
    <Flex.Scrap class_name="report-list-item">
      <div onClick={on_click}>
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}>{index}</Flex.Item>
          <Flex.Item flex={3}>{material.name}</Flex.Item>
          <Flex.Item flex={2}><Label.BsCoin value={material.price * quantity} /></Flex.Item>
          <Flex.Item flex={2}>
            <Label.BsCoin value={material.price} />
          </Flex.Item>
          {
            is_construction && (
              <>
                <Flex.Item flex={2} class_name="is-construction">
                  <Label.BsCoin value={item.price * quantity} />
                </Flex.Item>
                <Flex.Item flex={2}>
                  <input
                    type="number"
                    value={price}
                    className="quantity-input"
                    onClick={(e) => e.stopPropagation()}
                    onChange={on_price_change}
                  />
                </Flex.Item>
              </>
            )
          }
          <Flex.Item flex={2}>
            <input
              type="number"
              value={quantity}
              className="quantity-input"
              onClick={(e) => e.stopPropagation()}
              onChange={on_quantity_change}
            />
          </Flex.Item>
          <Flex.Item flex={2}>{moment(item.created).fromNow()}</Flex.Item>
          <Flex.Item flex={2}>
            <IconButton size="small" onClick={on_remove}>
              <DeleteIcon />
            </IconButton>
          </Flex.Item>
          {/* <Flex.Item flex={2}>{moment(item.created).format('DD/MM/YYYY LT')}</Flex.Item> */}
        </Flex>
      </div>
      <ConfirmationDialog
        open={confirm_remove_open}
        title="Confirmar eliminación"
        message={`¿Deseas eliminar "${material.name}"?`}
        on_confirm={on_confirm_remove}
        on_cancel={on_cancel_remove}
      />
    </Flex.Scrap>
  );
};

export { ListItem };
