import React from 'react';
import PropTypes from 'prop-types';

import { APE_LIST } from '../constants';

import './ApeList.scss';

const findType = (type) => {
  switch (type) {
  case APE_LIST.INDEX:
    return 'index-counter';
  case APE_LIST.ICON:
    return 'icon';
  case APE_LIST.TEXT:
    return 'text';
  case APE_LIST.TITLE:
    return 'title';
  case APE_LIST.OPTIONS:
    return 'options';
  default:
    throw new Error(`${type} field was defined for this case`);
  }
};

const FieldGenerator = ({ type, children }) => {
  const fieldsType = findType(type);

  return (
    <div className={fieldsType}>
      {children}
    </div>
  );
};

FieldGenerator.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export { FieldGenerator };
