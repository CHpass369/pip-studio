import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ width, height, position, class_name, children }) => {
  const style = {
    width,
    height,
    margin: 'auto',
  };

  if (position) {
    style.position = position;
  }

  return (
    <div className={class_name} style={style}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.node,
  height: PropTypes.node,
  position: PropTypes.string,
  class_name: PropTypes.string,
};

Container.defaultProps = {
  width: '100%',
  height: '100%',
  position: null,
  class_name: null,
};

export { Container };
