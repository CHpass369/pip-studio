import React from 'react';
import PropTypes from 'prop-types';

import { ListItem } from './ListItem';

import './List.scss';

const List = ({ current, items, onSelect }) => (
  <div className="compoment-list">
    {
      items
      .map((item) => <ListItem key={item._id} current={current} item={item} onSelect={onSelect} />)
    }
  </div>
);

List.propTypes = {
  current: PropTypes.node,
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  onSelect: PropTypes.func.isRequired,
};

List.defaultProps = {
  current: null,
};

export { List };
