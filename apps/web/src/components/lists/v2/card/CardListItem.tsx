import React, { useEffect, useState } from 'react';

import { Image } from 'components/images/v3';

import { CardData, CardItem } from './card.model';

import './CardListItem.scss';

interface CardListItemProps<T extends CardItem> {
  item: T;
  convert: (item: T) => CardData;
  on_select: (item: T) => void;
}

const CardListItem = <T extends CardItem>(parameters: CardListItemProps<T>) => {
  if (!parameters) {
    throw new Error('parameters is undefined');
  }

  const { item, convert, on_select } = parameters;
  const [data, set_data] = useState<CardData>(() => convert(item));

  useEffect(() => {
    set_data(convert(item));
  }, [item, convert]);

  const on_click = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    on_select(item);
  };

  const on_key_down = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    on_select(item);
  };

  return (
    <div
      className="card"
      role="button"
      tabIndex={0}
      onClick={on_click}
      onKeyDown={on_key_down}
    >
      <div className="image">
        <Image image={data.image_id} direction={Image.H} width="100%" height="100%" quality={1080} alt={data.name} />
      </div>
      <div className="body">
        <div className="title">{data.name}</div>
        <div className="subtitle">{data.description}</div>
      </div>
    </div>
  );
};

export { CardListItem };
