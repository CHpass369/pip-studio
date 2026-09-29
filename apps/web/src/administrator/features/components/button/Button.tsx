import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ label, icon, onClick }) => {
  const onHandleClick = (e: any) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button className="ui icon button" onClick={onHandleClick}>
      <i aria-hidden="true" className={`icon ${icon}`}></i>
      {label}
    </button>
  )
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { Button };
