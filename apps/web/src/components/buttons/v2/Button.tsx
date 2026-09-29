import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Button.scss';

const Button = ({ label, color, submit, on_click }) => {
  const handle_click = (e: any) => {
    e.stopPropagation();
    if (on_click) on_click();
  };

  return (
    <button
      className={classNames('ui', 'button', color)}
      type={submit ? 'submit' : 'button'}
      onClick={handle_click}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  submit: PropTypes.bool,
  on_click: PropTypes.func,
};

Button.defaultProps = {
  color: '',
  submit: false,
  on_click: null,
};

export { Button };
