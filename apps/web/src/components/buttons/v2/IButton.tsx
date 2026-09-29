import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Button.scss';

const IButton = ({ label, icon, color, submit, on_click }) => {
  const handle_click = (e: any) => {
    e.stopPropagation();
    if (on_click) on_click();
  };

  return (
    <button
      className={classNames('ui', 'icon', 'button', color)}
      type={submit ? 'submit' : 'button'}
      onClick={handle_click}
    >
      <i aria-hidden="true" className={classNames('icon', icon)} />
      {label}
    </button>
  );
};

IButton.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  submit: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  on_click: PropTypes.func,
};

IButton.defaultProps = {
  color: '',
  submit: false,
  on_click: null,
};

export { IButton };
