import React from 'react';
import PropTypes from 'prop-types';

import { Chip } from './Chip';

import './Chip.scss';

const ChipList = ({ items, current, on_handle_click }) => (
  <div className="list-chip">
    <Chip key={1000000} item={{ name: 'Todos', _id: null }} current={current} on_handle_click={on_handle_click} />
    {
      items.map((item) => (
        <Chip
          key={item._id}
          item={item}
          current={current}
          on_handle_click={on_handle_click}
        />
      ))
    }
  </div>
);

ChipList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  current: PropTypes.any,
  on_handle_click: PropTypes.func.isRequired,
};

ChipList.defaultProps = {
  current: null,
};

export { ChipList };
