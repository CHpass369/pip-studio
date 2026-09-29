import React from 'react';
import PropTypes from 'prop-types';

import './GenericListItem.scss';

const GenericListItem = ({ children }) => (
  <div className="generic-list-item">
    {children}
  </div>
);

const Text = ({ name }) => (
  <div className="generic-text">
    {name}
  </div>
);

Text.propTypes = {
  name: PropTypes.string,
};

Text.defaultProps = {
  name: '',
};

const Item = ({ name }) => (
  <div className="generic-item">
    {name}
  </div>
);

Item.propTypes = {
  name: PropTypes.string,
};

Item.defaultProps = {
  name: '',
};

const Input = ({ children }) => (
  <div className="generic-input">
    {children}
  </div>
);

Input.propTypes = {
  children: PropTypes.any.isRequired,
};

GenericListItem.propTypes = {
  children: PropTypes.any.isRequired,
};

const Number = ({ children }) => (
  <div className="generic-number">
    {children}
  </div>
);

Number.propTypes = {
  children: PropTypes.any.isRequired,
};

GenericListItem.propTypes = {
  children: PropTypes.any.isRequired,
};

GenericListItem.Text = Text;
GenericListItem.Item = Item;
GenericListItem.Input = Input;
GenericListItem.Number = Number;

export { GenericListItem };
