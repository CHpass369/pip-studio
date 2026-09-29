import React from 'react';
import PropTypes from 'prop-types';

import { FieldGenerator } from './ApeListFields';

import './ApeList.scss';

const ApeListTitle = ({ header }) => {

  return (
    <div className="list-item">
      {
        header.map((item, i) => (
          <FieldGenerator key={i} type={item.type}>
            {item.value}
          </FieldGenerator>
        ))
      }
    </div>
  );
};

ApeListTitle.propTypes = {
  header: PropTypes.shape(PropTypes.any).isRequired,
};

export { ApeListTitle };
