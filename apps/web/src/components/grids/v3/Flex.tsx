import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Flex.scss';

const DIRECTION = {
  H: 'ROW',
  V: 'COLUMN',
};

const Flex = ({ children, class_name, direction }) => (
  <div
    className={
      classNames(class_name, {
        'grid-3-row': direction === DIRECTION.H,
        'grid-3-column': direction === DIRECTION.V,
      })
    }
  >
    {children}
  </div>
);

Flex.propTypes = {
  children: PropTypes.node,
  class_name: PropTypes.string,
  direction: PropTypes.string,
};

Flex.defaultProps = {
  children: null,
  class_name: null,
  direction: DIRECTION.V,
};

const Item = ({ class_name, flex, children }) => {
  const style = { flex };

  return (
    <div className={classNames('grid-3-flex', class_name)} style={style}>
      {children}
    </div>
  );
};

Item.propTypes = {
  class_name: PropTypes.string,
  flex: PropTypes.number,
  children: PropTypes.node,
};

Item.defaultProps = {
  class_name: null,
  flex: 1,
  children: null,
};

const Scrap = ({ class_name, width, height, children }) => {
  const style = { width, height };

  return (
    <div className={classNames('grid-3-flex', class_name)} style={style}>
      {children}
    </div>
  );
};

Scrap.propTypes = {
  class_name: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node,
};

Scrap.defaultProps = {
  class_name: null,
  width: 'auto',
  height: 'auto',
  children: null,
};

const Center = ({ class_name, children }) => (
  <div className={classNames('grid-3-center', class_name)}>
    {children}
  </div>
);

Center.propTypes = {
  class_name: PropTypes.string,
  children: PropTypes.node,
};

Center.defaultProps = {
  class_name: null,
  children: null,
};

const End = ({ children }) => (
  <div className="grid-3-end">
    {children}
  </div>
);

End.propTypes = {
  children: PropTypes.node,
};

End.defaultProps = {
  children: null,
};

// const Start = ({ children }) => (
//   <div className="grid-3-start">
//     {children}
//   </div>
// );

// Start.propTypes = {
//   children: PropTypes.node,
// };

// Start.defaultProps = {
//   children: null,
// };

Flex.H = DIRECTION.H;
Flex.V = DIRECTION.V;
Flex.Item = Item;
Flex.Scrap = Scrap;
Flex.Center = Center;
Flex.End = End;
// Flex.Start = Start;

export { Flex };
