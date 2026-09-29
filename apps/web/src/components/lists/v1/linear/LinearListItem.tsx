import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './LinearListItem.scss';

const LinearListItem = ({ current, item, on_select }) => {
  const class_names = { 'list-item-select': current && current._id === item._id };

  const onClick = (e: any) => {
    e.stopPropagation();
    on_select(item);
  };

  return (
    <div
      className={classnames('list-item', 'linear-list-item', class_names)}
      onClick={onClick}
    >
      <h3>
        {item.name}
      </h3>
      <p>
        {item.description}
      </p>
    </div>
  );
};

LinearListItem.propTypes = {
  current: PropTypes.node,
  on_select: PropTypes.func,
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

LinearListItem.defaultProps = {
  current: null,
  on_select: () => {},
};

export { LinearListItem };
