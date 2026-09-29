import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './VContainer.scss';

const VContainer = ({ children }) => (
  <div className="v-container">
    {children}
  </div>
);

VContainer.propTypes = {
  children: PropTypes.node,
};

VContainer.defaultProps = {
  children: null,
};

const VContent = ({ children, className }) => (
  <div className={classNames('v-content', className)}>
    {children}
  </div>
);

VContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

VContent.defaultProps = {
  className: null,
  children: null,
};

const VFlex = ({ flex, size, only = ['mobile', 'computer', 'screen'], color, children }) => {
  const style = {};
  if (flex) {
    style.flex = flex;
  }
  if (size) {
    style.height = `${size}px`;
  }
  if (color) {
    style.background = color;
  }

  const names = only.map((item) => `v-flex-${item}`).join(' ');

  return (
    <div className={classNames('v-flex', names)} style={style}>
      {children}
    </div>
  );
};

VFlex.propTypes = {
  flex: PropTypes.number,
  size: PropTypes.number,
  only: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string,
  children: PropTypes.node,
};

VFlex.defaultProps = {
  flex: null,
  size: null,
  color: null,
  only: ['mobile', 'computer', 'screen'],
  children: null,
};

export { VContainer, VContent, VFlex };
