import React from 'react';
import PropTypes from 'prop-types';

import './Screen.scss';

const IconToolbarContainer = ({ children }) => {
  return (
    <div className="icon-toolbar">
      {children}
    </div>
  );
};

IconToolbarContainer.propTypes = {
  children: PropTypes.node,
};

export { IconToolbarContainer };
