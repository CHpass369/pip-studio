
import React from 'react';
import PropTypes from 'prop-types';

import './Container.scss';

const CenterContainer = ({ children }) => {
 
  return (
    <div className="center-container">
      {children}
    </div>
  );
};

CenterContainer.propTypes = {
  children: PropTypes.node,
};

export { CenterContainer };
