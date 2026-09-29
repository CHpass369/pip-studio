import React from 'react';
import PropTypes from 'prop-types';

import './Screen.scss';

const NotifierContainer = ({ children }) => {
  return (
    <div className="notifier">
      {children}
    </div>
  );
};

NotifierContainer.propTypes = {
  children: PropTypes.node,
};

export { NotifierContainer };
