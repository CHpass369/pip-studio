import React from 'react';
import PropTypes from 'prop-types';

import { Flex } from 'components/grids/v5';

import './EmptyInfo.scss';

const EmptyInfo = ({ description }) => (
  <Flex.Center class_name="content-3-empty-info">
    <i>{description}</i>
  </Flex.Center>
);

EmptyInfo.propTypes = {
  description: PropTypes.string.isRequired,
};

export { EmptyInfo };
