import React, { useCallback } from 'react';
import moment from 'moment';
import { Flex } from 'components/grids/v5';
import { Label } from 'components/labels/v1';
import { useSelector } from 'react-redux';

export interface GeneralItem {
  name: string;
  measure_id: string;
  quantity: number;
  unit_price: number;
  sub_total: number;
  materials_price: number;
  tools_price: number;
  workers_price: number;
  module_name: string;
  start_date: string;
  end_date: string;
}

export interface GeneralTotals {
  sub_total: number;
  materials_price: number;
  tools_price: number;
  workers_price: number;
}

interface ListItemProps {
  index: number;
  item: GeneralItem;
  on_select: (item: GeneralItem) => void;
}

const ListItem = ({ index, item, on_select }: ListItemProps) => {
  const { measures } = useSelector((state: any) => state.project_assets);

  const on_click = (e: React.MouseEvent) => {
    e.stopPropagation();
    on_select(item);
  };
  
  const get_measure = useCallback((measure_id: string) => {
    const measure = measures.find((measure) => measure._id === measure_id);

    if (measure != null) {
      return measure.abbreviation;
    }
    
    return '';
  }, [measures]);

  return (
    <Flex.Scrap class_name="report-list-item">
      <div onClick={on_click}>
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}>{index}</Flex.Item>
          <Flex.Item flex={5}>{item.name}</Flex.Item>
          <Flex.Item flex={1}>{get_measure(item.measure_id)}</Flex.Item>
          <Flex.Item flex={2}><Label.Rounding value={item.quantity} /></Flex.Item>
          <Flex.Item flex={2}><Label.BsCoin value={item.unit_price} /></Flex.Item>
          <Flex.Item flex={2}><Label.BsCoin value={item.sub_total} /></Flex.Item>
          <Flex.Item flex={2}><Label.BsCoin value={item.materials_price} /></Flex.Item>
          <Flex.Item flex={2}><Label.BsCoin value={item.workers_price} /></Flex.Item>
          <Flex.Item flex={2}><Label.BsCoin value={item.tools_price} /></Flex.Item>
          <Flex.Item flex={2}>{item.module_name}</Flex.Item>
          <Flex.Item flex={2}>{moment(item.start_date).fromNow()}</Flex.Item>
          <Flex.Item flex={2}>{moment(item.end_date).fromNow()}</Flex.Item>
        </Flex>
      </div>
    </Flex.Scrap>
  );
};



export { ListItem };
