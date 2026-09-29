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

const VContainerContent = ({ children }) => {
 
  return (
    <div className="v-container-content">
      {children}
    </div>
  );
};

VContainerContent.propTypes = {
  children: PropTypes.node,
};

export { VContainer, VContainerContent };
