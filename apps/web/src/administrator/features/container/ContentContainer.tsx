import React from 'react';
import PropTypes from 'prop-types';

import './Screen.scss';

const ContentContainer = ({ children }) => {
  return (
    <div className="content-container">
      {children}
    </div>
  );
};

ContentContainer.propTypes = {
  children: PropTypes.node,
};

export { ContentContainer };
