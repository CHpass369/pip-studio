import React from 'react';
import PropTypes from 'prop-types';

import { ApeListItem } from './ApeListItem';
import { ApeListTitle } from './ApeListTitle';

import './ApeList.scss';

const ApeList = ({ header, fields, items }) => {
  return (
    <div className="ape-List">
      <ApeListTitle header={header}></ApeListTitle>
      <div>
        {
          items.map((item, index) => <ApeListItem key={index} index={index} fields={fields} item={item}/>)
        }
      </div>
    </div>
  );
};

ApeList.propTypes = {
  header: PropTypes.any.isRequired,
  fields: PropTypes.shape(PropTypes.any).isRequired,
  items: PropTypes.shape(PropTypes.any).isRequired,
};

export { ApeList };
