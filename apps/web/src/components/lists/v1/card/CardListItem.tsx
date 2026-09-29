import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Image } from 'components/images/v3';

import './CardListItem.scss';

const CardListItem = ({ item, convert, on_select }) => {
  const [data, setData] = useState(convert(item));
  const on_click = (e: any) => {
    e.stopPropagation();
    on_select(item);
  };

  useEffect(() => {
    setData(convert(item));
  }, [item, convert]);

  return (
    <div className="list-item" onClick={on_click}>
      <div className="options">
        <div className="icons" />
      </div>
      <div className="image">
        <Image image={data.image_id} direction={Image.H} height="160px" quality={1080} />
      </div>
      <div className="title">{data.name}</div>
      <div className="subtitle">{data.description}</div>
    </div>
  );
};

CardListItem.propTypes = {
  item: PropTypes.any.isRequired,
  convert: PropTypes.func.isRequired,
  on_select: PropTypes.func.isRequired,
};

export { CardListItem };
