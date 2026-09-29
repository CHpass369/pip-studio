import React from 'react';
import PropTypes from 'prop-types';

import './Screen.scss';

const Screen = ({ children }) => {

  const style = {
    //background: `linear-gradient(0deg, rgba(22, 22, 22, 1) 0%, rgba(22, 22, 22, 1) 35%, ${color} 100%)`,
    // background: `linear-gradient(0deg, rgb(32, 78, 88) 0%, rgb(35, 98, 109) 35%, ${color} 100%)`
    // background: `linear-gradient(0deg, rgb(36, 62, 121) 0%, rgb(44, 65, 165) 35%, rgb(58, 114, 183) 100%)`
    // background: `linear-gradient(0deg, rgb(45, 22, 56) 0%, rgb(70, 33, 82) 35%, rgb(65, 28, 74) 100%)`
    // background: `linear-gradient(0deg, rgb(51, 22, 56) 0%, rgb(70, 33, 82) 35%, rgb(255, 0, 106) 100%)`
    // background: `linear-gradient(0deg, rgb(60, 49, 61) 0%, rgb(49, 39, 51) 35%, rgb(41, 18, 26) 100%)`,
    //background: `linear-gradient(0deg, rgb(15, 69, 57) 0%, rgb(0, 245, 155) 27%, rgb(13, 74, 57) 100%)`
    //background: `linear-gradient(0deg, rgb(228, 228, 228) 0%, rgb(62, 232, 208) 35%, rgb(45, 44, 44) 100%)`
    // background: `linear-gradient(0deg, rgb(221, 103, 103) 0%, rgb(232, 62, 86) 35%, rgb(39, 31, 31) 100%)`,
    background: 'linear-gradient(0deg, rgb(17, 17, 17) 0%, rgb(22, 22, 22) 35%, rgb(33, 33, 33) 100%)',
    // background: linear-gradient(
    //   0deg
    //   , rgb(33 176 143) 0%, rgb(24 227 152) 27%, rgb(41, 18, 26) 100%);
  }

  return (
    <div className="screen" style={style}>
      {children}
    </div>
  );
};

Screen.propTypes = {
  children: PropTypes.node,
};

export { Screen };
