import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Chip.scss';

const Chip = ({ item, current, on_handle_click }) => {
  const on_click = (e: any) => {
    e.stopPropagation();
    on_handle_click(item);
  };

  return (
    <div className={classnames('chip', { 'on-chip-select': current && current._id === item._id })} onClick={on_click}>
      <h4>{item.name || item.email}</h4>
    </div>
  );
};

Chip.propTypes = {
  item: PropTypes.any.isRequired,
  current: PropTypes.any.isRequired,
  on_handle_click: PropTypes.func.isRequired,
};

export { Chip };
