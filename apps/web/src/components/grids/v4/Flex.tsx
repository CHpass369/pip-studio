import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Flex.scss';

const DIRECTION = {
  H: 'ROW',
  V: 'COLUMN',
};

const Flex = ({ children, color, class_name, direction }) => {
  const style = {};

  if (color) {
    style.background = color;
  }

  return (
    <div
      className={
        classNames(class_name, {
          'grid-4-row': direction === DIRECTION.H,
          'grid-4-column': direction === DIRECTION.V,
        })
      }
      style={style}
    >
      {children}
    </div>
  );
};

Flex.propTypes = {
  class_name: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  direction: PropTypes.string,
};

Flex.defaultProps = {
  class_name: null,
  children: null,
  color: null,
  direction: DIRECTION.V,
};

const Item = ({ flex = 1, class_name, only = ['mobile', 'computer', 'screen'], direction, children }) => {
  const style = {
    flex,
  };

  if (direction === DIRECTION.H) {
    style.overflowX = 'auto';
  }
  if (direction === DIRECTION.V) {
    style.overflowY = 'auto';
  }

  const class_names = only.map((item) => `grid-4-flex-${item}`).join(' ');

  return (
    <div className={classNames('grid-4-flex', class_name, class_names)} style={style}>
      {children}
    </div>
  );
};

Item.propTypes = {
  class_name: PropTypes.string,
  flex: PropTypes.number,
  only: PropTypes.arrayOf(PropTypes.string),
  direction: PropTypes.string,
  children: PropTypes.node,
};

Item.defaultProps = {
  class_name: null,
  flex: 1,
  only: ['mobile', 'computer', 'screen'],
  direction: null,
  children: null,
};

const Scrap = ({ class_name, width, height, only, children }) => {
  const style = { width, height };
  const class_names = only.map((item) => `grid-4-flex-${item}`).join(' ');

  return (
    <div className={classNames('grid-4-flex', class_name, class_names)} style={style}>
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

const Start = ({ children }) => (
  <div className="grid-4-start">
    {children}
  </div>
);

Start.propTypes = {
  children: PropTypes.node,
};

Start.defaultProps = {
  children: null,
};

const Center = ({ children }) => (
  <div className="grid-4-center">
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
  <div className="grid-4-end">
    {children}
  </div>
);

End.propTypes = {
  children: PropTypes.node,
};

End.defaultProps = {
  children: null,
};

Flex.H = DIRECTION.H;
Flex.V = DIRECTION.V;

Flex.Item = Item;
Flex.Scrap = Scrap;

Flex.Start = Start;
Flex.Center = Center;
Flex.End = End;

export { Flex };
