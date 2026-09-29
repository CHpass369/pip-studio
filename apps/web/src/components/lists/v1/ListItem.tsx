import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './List.scss';

const ListItem = ({ current, item, onSelect }) => {
  const on_click = (e: any) => {
    e.stopPropagation();
    onSelect(item);
  };

  return (
    <div
      className={
        classnames('list-item', { 'list-item-select': current && current._id === item._id })
      }
      onClick={on_click}
    >
      {item.name}
    </div>
  );
};

ListItem.propTypes = {
  current: PropTypes.node,
  item: PropTypes.node.isRequired,
  onSelect: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  current: null,
};

export { ListItem };
