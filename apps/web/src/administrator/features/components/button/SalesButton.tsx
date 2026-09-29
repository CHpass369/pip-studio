import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './SalesButton.scss';

const SalesButton = ({ current, item, disabled, onClick }) => {

  const handleOnSelect = (e: any) => {
    e.stopPropagation();
    if (disabled) return;
    onClick(item);
  };

  return (
    <div
      className={classnames('summary-btn', {
        'summary-btn-select': current && current.key === item.key,
        'summary-btn-disabled': disabled,
      })}
      onClick={handleOnSelect}
    >
      {item.value}
    </div>
  )
};

SalesButton.propTypes = {
  current: PropTypes.any,
  item: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

SalesButton.defaultProps = {
  current: null,
  item: {
    key: null,
    value: 'Not found'
  },
  disabled: false,
  onClick: () => {
    throw new Error('function is unimplemented');
  }
};

export { SalesButton };
