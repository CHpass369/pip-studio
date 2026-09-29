import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './LinearListOptionItem.scss';

const LinearListOptionItem = ({ current, item, on_select, options }) => {
  const class_names = { 'list-item-select': current && current._id === item._id };

  const onClick = (e: any) => {
    e.stopPropagation();
    on_select(item);
  };

  return (
    <div
      className={classnames('list-item', 'linear-list-options-item', class_names)}
      onClick={onClick}
    >
      <div className="details">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
      <div className="options">
        {options(item)}
      </div>
    </div>
  );
};

LinearListOptionItem.propTypes = {
  current: PropTypes.node,
  options: PropTypes.func,
  on_select: PropTypes.func,
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

LinearListOptionItem.defaultProps = {
  current: null,
  options: null,
  on_select: () => {},
};

export { LinearListOptionItem };
