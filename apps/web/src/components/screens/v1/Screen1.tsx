import React from 'react';
import PropTypes from 'prop-types';

import './Screen1.scss';

const Screen1 = ({ children }) => {
  const style = {
    // 'linear-gradient(0deg, rgb(221, 103, 103) 0%, rgb(232, 62, 86) 35%, rgb(39, 31, 31) 100%)',
    // 'linear-gradient(45deg, rgb(38, 25, 25) 0%, rgb(199, 168, 255) 51%, rgb(214, 192, 255) 100%)'
    // 'linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(245, 152, 255) 51%, rgb(0, 0, 0) 100%)',
    // 'linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(65, 69, 99) 51%, rgb(0, 0, 0) 100%)',
    // linear-gradient(45deg, rgb(234 132 132) 0%, rgb(251 136 136) 51%, rgb(245 151 151) 100%)
    // 'linear-gradient(45deg, rgb(60 58 68) 0%, rgb(27 27 48) 67%, rgb(237 28 147) 100%)'
    // 'linear-gradient(36deg, rgb(170 134 82) 0%, rgb(4 18 29) 65%, rgb(65 166 187) 100%)',
    // 'linear-gradient(36deg, rgb(45 45 45) 0%, rgb(29 108 100) 59%, rgb(69 165 185) 100%)',
    // 'linear-gradient(36deg, rgb(45 45 45) 0%, rgb(41 124 145) 59%, rgb(69 165 185) 100%)',
    // 'linear-gradient(36deg, rgb(5 67 85) 0%, rgb(5 131 167) 59%, rgb(0 193 233) 100%)',
    // 'linear-gradient(36deg, rgb(21 48 56) 0%, rgb(10 44 54) 50%, rgb(69 155 172) 100%)',
    // background: 'linear-gradient(90deg, rgb(70, 11, 47) 0%, rgb(160, 65, 85) 100%)',
    // background: 'linear-gradient(90deg, rgb(229, 229, 229) 0%, rgb(225, 225, 225) 100%)',
    background: 'linear-gradient(0deg, rgb(187, 187, 187) 0%, rgb(184, 184, 184) 100%)',
  };

  return (
    <div className="v1-screen" style={style}>
      {children}
    </div>
  );
};

Screen1.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Screen1 };
