import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './IRoomButton.scss';

const IRoomButton = ({ label, icon, color, on_click }) => {
  const handle_click = (e: any) => {
    e.stopPropagation();
    if (on_click) on_click();
  };

  return (
    <div className={classNames('helper-room-button', `color-${color}`)} onClick={handle_click}>
      <i aria-hidden="true" className={classNames('icon', icon)} />
      {label}
    </div>
  );
};

IRoomButton.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  on_click: PropTypes.func,
};

IRoomButton.defaultProps = {
  color: '',
  on_click: null,
};

export { IRoomButton };
