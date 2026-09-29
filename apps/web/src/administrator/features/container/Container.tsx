import React from 'react';
import PropTypes from 'prop-types';

import './Screen.scss';

// const Container = ({ children, color='rgb(82, 18, 95)' }) => {
// color='rgb(37, 179, 167)'
const Container = ({ children }) => {

  // const style = {
  //   //background: `linear-gradient(0deg, rgba(22, 22, 22, 1) 0%, rgba(22, 22, 22, 1) 35%, ${color} 100%)`,
  //   // background: `linear-gradient(0deg, rgb(32, 78, 88) 0%, rgb(35, 98, 109) 35%, ${color} 100%)`
  //   // background: `linear-gradient(0deg, rgb(36, 62, 121) 0%, rgb(44, 65, 165) 35%, rgb(58, 114, 183) 100%)`
  //   // background: `linear-gradient(0deg, rgb(45, 22, 56) 0%, rgb(70, 33, 82) 35%, rgb(65, 28, 74) 100%)`
  //   background: `linear-gradient(0deg, rgb(51, 22, 56) 0%, rgb(70, 33, 82) 35%, rgb(255, 0, 106) 100%)`
  // };
  
  return (
    // <div className="container" style={style}>
    <div className="container">
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
};

export { Container };
