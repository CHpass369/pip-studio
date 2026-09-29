import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './List.scss';

const ListItem = ({ current, item, onSelect }) => {

  const onClick = (e: any) => {
    e.stopPropagation();
    onSelect(item);
  };
   
  return (
    <div className={classnames('list-item', { 'list-item-select': current && current._id === item._id })} onClick={onClick}>
      {item.name}
    </div>
  );
};

ListItem.propTypes = {
  current: PropTypes.object,
  item: PropTypes.any.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export { ListItem };
