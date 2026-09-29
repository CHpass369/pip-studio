import React from 'react';
import PropTypes from 'prop-types';

import './CContainer.scss';

const CContainer = ({ children }) => (
  <div className="c-container">
    {children}
  </div>
);

CContainer.propTypes = {
  children: PropTypes.node,
};

CContainer.defaultProps = {
  children: null,
};

export { CContainer };
