import React from 'react';
import PropTypes from 'prop-types';

import './AdminTitleContainer.scss';

const AdminTitleContainer = ({ children }) => {
  return (
    <div className="generator">
      <div className="cover">
        {children}
      </div>
    </div>
  );
};

AdminTitleContainer.propTypes = {
  children: PropTypes.node,
};

export { AdminTitleContainer };
