import React from 'react';

import { Flex } from 'components/grids/v5';
import { LinearListItem } from './LinearListItem';

import './LinearList.scss';

const LinearList = ({ item, items = [], on_select }) => {
  const render_item = (data) => (
    <LinearListItem key={data._id} current={item} item={data} on_select={on_select} />
  );

  return (
    <Flex.Item>
      <div className="linear-list">
        {items.map(render_item)}
      </div>
    </Flex.Item>
  );
};

export { LinearList };
