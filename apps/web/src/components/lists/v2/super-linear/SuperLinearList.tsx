import React from 'react';

import { Flex } from 'components/grids/v5';
import { SuperLinearListItem } from './SuperLinearListItem';

import './SuperLinearList.scss';

const SuperLinearList = ({ item, items = [], on_select }) => {
  const render_item = (data) => (
    <SuperLinearListItem key={data._id} current={item} item={data} on_select={on_select} />
  );

  return (
    <Flex.Item>
      <div className="super-linear-list">
        {items.map(render_item)}
      </div>
    </Flex.Item>
  );
};

export { SuperLinearList };
