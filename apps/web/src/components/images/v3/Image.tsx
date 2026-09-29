import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { BASE_PATH } from 'generics/constants';
import default_image from '../../../assets/images/final.jpg';

import './Image.scss';

const DIRECTION = {
  H: 'width',
  V: 'height',
};

const Image = ({ image, width, height, direction, bg, quality, alt = '' }) => {
  const [item, setItem] = useState({
    image: bg || default_image,
  });
  const style = {
    width,
    height,
  };

  useEffect(() => {
    if (!image) {
      return;
    }

    setItem({
      image: `${BASE_PATH.FILES}/v1/assets/images/${direction}/${quality}/${image}`,
    });
  }, [image, quality, direction]);

  return (
    <div className="component-image" style={style}>
      {
        item && <img alt={alt} src={item.image} />
      }
    </div>
  );
};

Image.H = DIRECTION.H;
Image.V = DIRECTION.V;

export { Image };
