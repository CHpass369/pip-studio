import React from 'react';
import PropTypes from 'prop-types';

import { ListItem } from './ListItem';

import './List.scss';

const List = ({ current, items, onSelect }) => {
  return (
    <div className="compoment-list">
      {
        items.map((item, index) => <ListItem key={index} current={current} item={item} onSelect={onSelect} />)
      }
    </div>
  );
};

List.propTypes = {
  current: PropTypes.object,
  items: PropTypes.shape(PropTypes.any).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export { List };
