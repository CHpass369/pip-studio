import React from 'react';
import PropTypes from 'prop-types';

import { Flex } from 'components/grids/v5';
import { LinearListOptionItem } from './LinearListOptionItem';

import './LinearListOption.scss';

const LinearListOption = ({ item, items, on_select, options }) => {
  const render_item = (data) => (
    <LinearListOptionItem
      key={data._id}
      current={item}
      item={data}
      on_select={on_select}
      options={options}
    />
  );

  return (
    <Flex.Item>
      <div className="linear-list-options">
        {items.map(render_item)}
      </div>
    </Flex.Item>
  );
};

LinearListOption.propTypes = {
  item: PropTypes.node,
  options: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  on_select: PropTypes.func,
};

LinearListOption.defaultProps = {
  item: null,
  options: null,
  on_select: null,
};

export { LinearListOption };
