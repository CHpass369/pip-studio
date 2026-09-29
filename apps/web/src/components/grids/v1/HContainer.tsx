import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './HContainer.scss';

const HContainer = ({ children }) => (
  <div className="h-container">
    {children}
  </div>
);

HContainer.propTypes = {
  children: PropTypes.node,
};

HContainer.defaultProps = {
  children: null,
};

const HContent = ({ children }) => (
  <div className="h-content">
    {children}
  </div>
);

HContent.propTypes = {
  children: PropTypes.node,
};

HContent.defaultProps = {
  children: null,
};

const HFlex = ({ flex, size, only = ['mobile', 'computer', 'screen'], color, children }) => {
  const style = {};
  if (flex) {
    style.flex = flex;
  }
  if (size) {
    style.width = `${size}px`;
  }
  if (color) {
    style.background = color;
  }

  const names = only.map((item) => `h-flex-${item}`).join(' ');

  return (
    <div className={classNames('h-flex', names)} style={style}>
      {children}
    </div>
  );
};

export { HContainer, HContent, HFlex };
