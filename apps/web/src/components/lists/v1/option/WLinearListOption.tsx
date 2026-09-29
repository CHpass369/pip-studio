import React from 'react';
import PropTypes from 'prop-types';

import { Flex } from 'components/grids/v5';

import './LinearListOption.scss';

const WLinearListOption = ({ children }) => (
  <Flex.Item>
    <div className="linear-list-options">
      {children}
    </div>
  </Flex.Item>
);

WLinearListOption.propTypes = {
  children: PropTypes.node,
};

WLinearListOption.defaultProps = {
  children: null,
};

export { WLinearListOption };
