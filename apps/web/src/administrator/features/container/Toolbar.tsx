import React from 'react';
import PropTypes from 'prop-types';

import './Screen.scss';

const ToolbarContainer = ({ children }) => {
  return (
    <div className="toolbar">
      {children}
    </div>
  );
};

ToolbarContainer.propTypes = {
  children: PropTypes.node,
};

export { ToolbarContainer };
