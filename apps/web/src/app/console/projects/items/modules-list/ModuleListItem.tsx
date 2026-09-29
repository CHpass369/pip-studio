import React, { useCallback, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculateIcon from '@mui/icons-material/Calculate';

import { VolumeCalculatorDialog } from './VolumeCalculatorDialog';

import { Label } from 'components/labels/v1';
import { Flex } from 'components/grids/v5';
import { ConfirmationDialog } from 'components/generics/v2';
import actions from 'store/actions/console';
import { is_number } from 'generics/functions/basics';
import { ProjectConstruction } from 'app/models/project.model';

interface ModuleListItemProps {
  index: number;
  module_id: string;
  item: ProjectConstruction;
  on_select: (item: ProjectConstruction) => void;
}

const ModuleListItem = ({ index, module_id, item, on_select }: ModuleListItemProps) => {
  const dispatch = useDispatch();
  const [quantity, set_quantity] = useState<number | string>(item.quantity);
  const [calculator_open, set_calculator_open] = useState(false);
  const [confirm_remove_open, set_confirm_remove_open] = useState(false);
  const { measures } = useSelector((state: any) => state.project_assets);

  const on_click = (e: React.MouseEvent) => {
    e.stopPropagation();
    on_select(item);
  };

  const on_remove = (e: any) => {
    e.stopPropagation();
    set_confirm_remove_open(true);
  };

  const on_confirm_remove = (e: any) => {
    e.stopPropagation();
    set_confirm_remove_open(false);
    dispatch(actions.project.construction_event(module_id, { _id: item._id, type: 'remove' }));
  };

  const on_cancel_remove = (e: any) => {
    e.stopPropagation();
    set_confirm_remove_open(false);
  };

  const on_arrowdown = (e: any) => {
    e.stopPropagation();
    dispatch(actions.project.construction_event(module_id, { _id: item._id, type: 'arrowdown' }));
  };

  const on_arrowup = (e: any) => {
    e.stopPropagation();
    dispatch(actions.project.construction_event(module_id, { _id: item._id, type: 'arrowup' }));
  };

  const get_measure = useCallback((measure_id: string) => {
    const measure = measures.find((measure) => measure._id === measure_id);

    if (measure != null) {
      return measure.abbreviation;
    }
    
    return '';
  }, [measures]);

  const on_string_change = (event: any) => {
    event.stopPropagation();
    dispatch(actions.project.update_construction(module_id, {
      _id: item._id,
      name: event.target.value,
    }));
  };

  const on_quantity_change = (event: any) => {
    event.stopPropagation();
    const value = event.target.value;
    set_quantity(value);

    if (is_number(value)) {
      dispatch(actions.project.update_construction(module_id, {
      _id: item._id,
      quantity: parseFloat(value),
    }));
    }
  };

  const on_calculator_submit = (calculated_volume: any, calculated_items: any) => {
    set_quantity(calculated_volume);
    dispatch(actions.project.update_construction(module_id, {
      _id: item._id,
      quantity: parseFloat(calculated_volume),
      metric_calculation: calculated_items,
    }));
  };

  const on_calculator_remove = () => {
    if (!item) {
      throw new Error('item is undefined');
    }

    dispatch(actions.project.update_construction(module_id, {
      _id: item._id,
      metric_calculation: null,
    }));
  };

  return (
    <Flex.Scrap class_name="report-list-item">
      <div onClick={on_click}>
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}>{index}</Flex.Item>
          <Flex.Item flex={3}>
            <input
              type="text"
              value={item.name}
              name="name"
              className="quantity-input"
              onClick={(e) => e.stopPropagation()} 
              onChange={on_string_change}
            />
          </Flex.Item>
          <Flex.Item flex={1}>
            {get_measure(item.measure_id)}
          </Flex.Item>
          <Flex.Item flex={2}><Label.BsCoin value={item.quantity * item.unit_price} /></Flex.Item>
          <Flex.Item flex={2}>
            <Label.BsCoin value={item.unit_price} />
          </Flex.Item>
          <Flex.Item flex={2}>
            <Label.BsCoin value={item.prices.materials + item.prices.workers + item.prices.tools } />
          </Flex.Item>
          <Flex.Item flex={2}>
            <Flex direction={Flex.H}>
              <Flex.Item flex={1}>
                <input
                  type="number"
                  value={quantity}
                  name="quantity"
                  className="quantity-input"
                  onClick={(e) => e.stopPropagation()} 
                  onChange={on_quantity_change}
                />
              </Flex.Item>
              <Flex.Scrap>
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); set_calculator_open(true); }}>
                  <CalculateIcon />
                </IconButton>
              </Flex.Scrap>
              </Flex>
          </Flex.Item>
          <Flex.Item flex={2}>{moment(item.created).fromNow()}</Flex.Item>
          <Flex.Item flex={2}>
            <IconButton size="small" onClick={on_arrowdown}>
              <KeyboardDoubleArrowDownIcon />
            </IconButton>
            <IconButton size="small" onClick={on_arrowup}>
              <KeyboardDoubleArrowUpIcon />
            </IconButton>
            <IconButton size="small" onClick={on_remove}>
              <DeleteIcon />
            </IconButton>
          </Flex.Item>
        </Flex>
      </div>
      <VolumeCalculatorDialog
        open={calculator_open}
        initial_type={get_measure(item.measure_id)}
        metric_calculation={item.metric_calculation}
        on_close={() => set_calculator_open(false)}
        on_submit={on_calculator_submit}
        on_remove={on_calculator_remove}
      />
      <ConfirmationDialog
        open={confirm_remove_open}
        title="Confirmar eliminación"
        message={`¿Deseas eliminar "${item.name}"?`}
        on_confirm={on_confirm_remove}
        on_cancel={on_cancel_remove}
      />
    </Flex.Scrap>
  );
};

export { ModuleListItem };
