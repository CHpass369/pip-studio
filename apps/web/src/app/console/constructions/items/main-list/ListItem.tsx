import React from 'react';
import moment from 'moment';
import { Flex } from 'components/grids/v5';
import { Label } from 'components/labels/v1';
import { Construction } from 'app/models/construction.model';

interface ListItemProps {
  index: number;
  item: Construction;
  on_select: (item: Construction) => void;
  get_measure: (measure_id: string) => string;
}

const ListItem = ({ index, item, on_select, get_measure }: ListItemProps) => {
  const on_click = (e: React.MouseEvent) => {
    e.stopPropagation();
    on_select(item);
  };

  return (
    <div className="report-list-item" onClick={on_click}>
      <Flex direction={Flex.H}>
        <Flex.Item flex={1}>{index}</Flex.Item>
        <Flex.Item flex={3}>{item.name}</Flex.Item>
        <Flex.Item flex={2}>{get_measure(item.measure_id)}</Flex.Item>
        {/* <Flex.Item flex={2}><Label.BsCoin value={item.price} /></Flex.Item> */}
        {/* <Flex.Item flex={3}>
          {(getMaterialNames(item.materials) || []).join(', ')}
        </Flex.Item>
        <Flex.Item flex={3}>
          {(getToolNames(item.tools) || []).join(', ')}
        </Flex.Item>
        <Flex.Item flex={3}>
          {(getWorkerNames(item.workers) || []).join(', ')}
        </Flex.Item> */}
        <Flex.Item flex={2}>{moment(item.created).fromNow()}</Flex.Item>
        {/* <Flex.Item flex={2}>{moment(item.created).format('DD/MM/YYYY LT')}</Flex.Item> */}
      </Flex>
    </div>
  );
};

export { ListItem };
