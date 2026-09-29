import React from 'react';
import PropTypes from 'prop-types';

import './VContainer.scss';

const VContainer = ({ children }) => {
 
  return (
    <div className="v-container">
      {children}
    </div>
  );
};

VContainer.propTypes = {
  children: PropTypes.node,
};

const VContent = ({ children }) => {
 
  return (
    <div className="v-content">
      {children}
    </div>
  );
};

VContent.propTypes = {
  children: PropTypes.node,
};

export { VContainer, VContent };
