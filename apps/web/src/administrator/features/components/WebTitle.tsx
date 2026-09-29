import React from 'react';
import PropTypes from 'prop-types';

import './WebTitle.scss';

const WebTitle = ({ config }) => (
  <div className="toolbar-title">
    {
      config && (
        <>
          <h5>{config.context}</h5>
          <h1>{config.title}</h1>
          <h3>{config.subtitle}</h3>
        </>
      )
    }
  </div>
);

WebTitle.propTypes = {
  config: PropTypes.any.isRequired,
};

export { WebTitle };
