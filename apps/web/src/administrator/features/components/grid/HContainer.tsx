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

const HContent = ({ children }) => {
 
  return (
    <div className="h-content">
      {children}
    </div>
  );
};

HContent.propTypes = {
  children: PropTypes.node,
};

export { HContainer, HContent };
