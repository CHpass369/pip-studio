import React from 'react';
import PropTypes from 'prop-types';

import './Screen.scss';

const SummaryContainer = ({ children }) => {
  // const style = {
  //   //background: `linear-gradient(0deg, rgba(22, 22, 22, 1) 0%, rgba(22, 22, 22, 1) 35%, ${color} 100%)`,
  //   // background: `linear-gradient(0deg, rgb(32, 78, 88) 0%, rgb(35, 98, 109) 35%, ${color} 100%)`
  //   background: `linear-gradient(0deg, rgb(10, 45, 123) 0%, rgb(20, 38, 123) 35%, rgb(20, 49, 84) 100%)`
  // }

  return (
    <div className="summary">
      {children}
    </div>
  );
};

SummaryContainer.propTypes = {
  children: PropTypes.node,
};

export { SummaryContainer };
