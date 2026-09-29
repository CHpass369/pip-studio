import React from 'react';

import { CardListItem } from './CardListItem';
import { CardData, CardItem } from './card.model';

import './CardList.scss';

interface CardListProps<T extends CardItem> {
  items: T[];
  convert: (item: T) => CardData;
  on_select: (item: T) => void;
}

const CardList = <T extends CardItem>(parameters: CardListProps<T>) => {
  if (!parameters) {
    throw new Error('parameters is undefined');
  }

  const { items, convert, on_select } = parameters;

  return (
    <div className="card-list">
      {items.map((item) => (
        <CardListItem key={item._id} item={item} convert={convert} on_select={on_select} />
      ))}
    </div>
  );
};

export { CardList };
