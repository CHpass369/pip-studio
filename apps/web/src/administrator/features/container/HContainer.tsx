import React from 'react';
import PropTypes from 'prop-types';

import './HContainer.scss';

const HContainer = ({ children }) => {
 
  return (
    <div className="h-container">
      {children}
    </div>
  );
};

HContainer.propTypes = {
  children: PropTypes.node,
};

const HContainerContent = ({ children }) => {
 
  return (
    <div className="h-container-content">
      {children}
    </div>
  );
};

HContainerContent.propTypes = {
  children: PropTypes.node,
};

export { HContainer, HContainerContent };
