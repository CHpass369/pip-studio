import React from 'react';
import PropTypes from 'prop-types';

import './FormContainer.scss';

const FormContainer = ({ children }) => (
  <div className="form-container">
    {children}
  </div>
);

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FormContainer };
