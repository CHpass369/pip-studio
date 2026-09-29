import React from 'react';
import PropTypes from 'prop-types';

import { Flex } from 'components/grids/v5';
import { LinearListItem } from './LinearListItem';

import './LinearList.scss';

const LinearList = ({ item, items, on_select }) => {
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

LinearList.propTypes = {
  item: PropTypes.node,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  on_select: PropTypes.func,
};

LinearList.defaultProps = {
  item: null,
  on_select: null,
};

export { LinearList };
