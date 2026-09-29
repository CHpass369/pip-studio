import React from 'react';
import PropTypes from 'prop-types';

import { Flex } from 'components/grids/v5';

import './ModelTitle.scss';

const ModelTitle = ({ context, title, description }) => (
  <Flex.Scrap class_name="model-title">
    <h5>{context}</h5>
    <h1>{title}</h1>
    <p>{description}</p>
  </Flex.Scrap>
);

ModelTitle.propTypes = {
  context: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

ModelTitle.defaultProps = {
  context: '',
  title: '',
  description: '',
};

export { ModelTitle };
