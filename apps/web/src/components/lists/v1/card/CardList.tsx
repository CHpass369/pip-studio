import React from 'react';
import PropTypes from 'prop-types';

import { CardListItem } from './CardListItem';

import './CardList.scss';

const CardList = ({ items, convert, on_select }) => {
  const render_item = (item) => (
    <CardListItem key={item._id} item={item} convert={convert} on_select={on_select} />
  );

  return (
    <div className="card-list">
      <div>
        {items.map(render_item)}
      </div>
    </div>
  );
};

CardList.propTypes = {
  items: PropTypes.any.isRequired,
  convert: PropTypes.func.isRequired,
  on_select: PropTypes.func.isRequired,
};

export { CardList };
