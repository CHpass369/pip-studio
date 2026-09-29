import React from 'react';
import PropTypes from 'prop-types';

import './FormLabels.scss';

const FormLabels = ({ children }) => (
  <div className="form-labels">
    {children}
  </div>
);

FormLabels.propTypes = {
  children: PropTypes.node,
};

FormLabels.defaultProps = {
  children: null,
};

const Title = ({ children }) => (
  <div className="form-titles">
    {children}
  </div>
);

Title.propTypes = {
  children: PropTypes.node,
};

Title.defaultProps = {
  children: null,
};

const Field = ({ children }) => (
  <div className="labels-field">
    {children}
  </div>
);

Field.propTypes = {
  children: PropTypes.node,
};

Field.defaultProps = {
  children: null,
};

const Label = ({ value }) => (
  <div className="field-label">
    {value}
  </div>
);

Label.propTypes = {
  value: PropTypes.node,
};

Label.defaultProps = {
  value: null,
};

const Input = ({ value }) => (
  <div className="field-input">
    {value}
  </div>
);

Input.propTypes = {
  value: PropTypes.node,
};

Input.defaultProps = {
  value: null,
};

FormLabels.Title = Title;
FormLabels.Field = Field;
FormLabels.Label = Label;
FormLabels.Input = Input;

export { FormLabels };
