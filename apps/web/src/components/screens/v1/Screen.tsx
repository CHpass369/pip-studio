import React from 'react';
import PropTypes from 'prop-types';

import './Screen.scss';

const Screen = ({ children }) => {
  const style = {
    // background:
    // 'linear-gradient(45deg, rgb(52, 52, 52) 0%, rgb(20, 20, 20) 51%, rgb(20, 20, 20) 100%)',
    background: 'linear-gradient(45deg, rgb(32, 32, 32) 0%, rgb(154, 111, 160) 51%, rgb(32, 32, 32) 100%)',
    // 'linear-gradient(0deg, rgb(221, 103, 103) 0%, rgb(232, 62, 86) 35%, rgb(39, 31, 31) 100%)',
    // 'linear-gradient(0deg, rgb(17, 17, 17) 0%, rgb(22, 22, 22) 35%, rgb(33, 33, 33) 100%)',
  };

  return (
    <div className="screen" style={style}>
      {children}
    </div>
  );
};

Screen.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Screen };
