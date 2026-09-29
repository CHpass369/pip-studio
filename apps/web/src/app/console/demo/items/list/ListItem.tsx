import React from 'react';
import moment from 'moment';
import { Flex } from 'components/grids/v5';
import { Label } from 'components/labels/v1';
import { Resource } from 'app/models/resource.model';

interface ListItemProps {
  index: number;
  item: Resource;
  on_select: (item: Resource) => void;
}

const ListItem = ({ index, item, on_select }: ListItemProps) => {
  const on_click = (e: React.MouseEvent) => {
    e.stopPropagation();
    on_select(item);
  };

  return (
    <div className="report-list-item" onClick={on_click}>
      <Flex direction={Flex.H} class_name='list-gap'>
        <Flex.Item flex={1}>
          {index}
        </Flex.Item>
        <Flex.Item flex={6}>
          {item.name}
        </Flex.Item>
        <Flex.Item flex={2} class_name="grid-end">
          <Label.BsCoin value={item.price} />
        </Flex.Item>
        <Flex.Item flex={3}>
          {moment(item.created).fromNow()}
        </Flex.Item>
      </Flex>
    </div>
  );
};



export { ListItem };
