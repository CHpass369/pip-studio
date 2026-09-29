import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ width, height, children }) => {
  const style = {
    width,
    height,
    margin: 'auto',
  };
  return (
    <div style={style}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.node,
  height: PropTypes.node,
};

Container.defaultProps = {
  width: '100%',
  height: '100%',
};

export { Container };
