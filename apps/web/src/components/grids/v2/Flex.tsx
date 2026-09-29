import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Flex.scss';

const DIRECTION = {
  H: 'ROW',
  V: 'COLUMN',
};

const Flex = ({ children, color, direction }) => {
  const style = {};

  if (color) {
    style.background = color;
  }

  return (
    <div
      className={
        classNames({
          'grid-row': direction === DIRECTION.H,
          'grid-column': direction === DIRECTION.V,
        })
      }
    >
      {children}
    </div>
  );
};

Flex.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  direction: PropTypes.string,
};

Flex.defaultProps = {
  children: null,
  color: null,
  direction: DIRECTION.V,
};

const Item = ({ flex, only, children }) => {
  const style = { flex };
  const class_names = only.map((item) => `grid-flex-${item}`).join(' ');

  return (
    <div className={classNames('grid-flex', class_names)} style={style}>
      {children}
    </div>
  );
};

Item.propTypes = {
  flex: PropTypes.number,
  only: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
};

Item.defaultProps = {
  flex: 1,
  only: ['mobile', 'computer', 'screen'],
  children: null,
};

const Scrap = ({ class_name, width, height, only, children }) => {
  const style = { width, height };
  const class_names = only.map((item) => `grid-flex-${item}`).join(' ');

  return (
    <div className={classNames('grid-flex', class_name, class_names)} style={style}>
      {children}
    </div>
  );
};

Scrap.propTypes = {
  class_name: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  only: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
};

Scrap.defaultProps = {
  class_name: null,
  width: 'auto',
  height: 'auto',
  only: ['mobile', 'computer', 'screen'],
  children: null,
};

const Center = ({ children }) => (
  <div className="grid-center">
    {children}
  </div>
);

Center.propTypes = {
  children: PropTypes.node,
};

Center.defaultProps = {
  children: null,
};

const End = ({ children }) => (
  <div className="grid-end">
    {children}
  </div>
);

End.propTypes = {
  children: PropTypes.node,
};

End.defaultProps = {
  children: null,
};

const Start = ({ children }) => (
  <div className="grid-start">
    {children}
  </div>
);

Start.propTypes = {
  children: PropTypes.node,
};

Start.defaultProps = {
  children: null,
};

Flex.H = DIRECTION.H;
Flex.V = DIRECTION.V;
Flex.Item = Item;
Flex.Scrap = Scrap;
Flex.Center = Center;
Flex.End = End;
Flex.Start = Start;

export { Flex };
