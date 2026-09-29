import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Circle.scss';

const Circle = ({ active }) => (
  <span className={classnames(active ? 'circle-dot-green' : 'circle-dot-red')} />
);

Circle.propTypes = {
  active: PropTypes.bool,
};

Circle.defaultProps = {
  active: false,
};

export { Circle };
