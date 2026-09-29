import React from 'react';
import PropTypes from 'prop-types';

import { ApeCardListItem } from './ApeCardListItem';

import './ApeList.scss';

const ApeCardList = ({ items, convert, actions, editModal, removeModal = true }) => {

  return (
    <div className="ape-card-list">
      <div>
        {
          items.map((item, index) => <ApeCardListItem key={index} item={item} actions={actions} editModal={editModal} convert={convert} removeModal={removeModal} />)
        }
      </div>
    </div>
  );
};

ApeCardList.propTypes = {
  items: PropTypes.any.isRequired,
  convert: PropTypes.shape(PropTypes.any).isRequired,
  actions: PropTypes.any.isRequired,
  editModal: PropTypes.any.isRequired,
  removeModal: PropTypes.bool.isRequired,
};

export { ApeCardList };
