import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { BASE_PATH } from 'generics/constants';
// import { EDIT } from 'generics/constants/service.constants';
import default_image from '../../../assets/images/pexels-oleg-magni-1005638.jpg';

import './ApeCardList.scss';

const ApeCardListItem = ({ item, editModal, actions, convert, removeModal }) => {
  const [data, setData] = useState(convert(item));
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const dispatch = useDispatch();
  const EditModel = editModal;

  const onEdit = (e: any) => {
    e.stopPropagation();
    // eslint-disable-next-line
    //e.preventDefault();
    setOpenUpdateModal(true);
  };

  const onRemove = (e: any) => {
    e.stopPropagation();
    // eslint-disable-next-line
    //e.preventDefault();
    setOpenRemoveModal(true);
    // TODO: remove
    console.info('openRemoveModal :>> ', openRemoveModal);
  };

  // const onRemoveItem = () => {
  //   dispatch(generator(actions, REMOVE, item));
  // };

  const onEditItem = (data) => {
    // dispatch(generator(actions, EDIT, data));
  };

  useEffect(() => {
    setData(convert(item));
    // eslint-disable-next-line
  }, [item]);

  return (
    <div className="list-item" onClick={(e: any) => { onEdit(e) }}>
      <div className="options">
        {
          EditModel &&
          <EditModel data={item} open={openUpdateModal} actions={actions} setOpen={setOpenUpdateModal} onHandle={(data) => { onEditItem(data) }}></EditModel>
        }
        {
          removeModal &&
          <div className="icons" onClick={(e: any) => { onRemove(e) }}>
            {/* <Icon name='edit outline' size='large' /> */}
            {/* <RemoveModal open={openRemoveModal} actions={actions} setOpen={setOpenRemoveModal} onHandle={() => { onRemoveItem() }}></RemoveModal>
            <Icon name='remove circle' size='large' /> */}
          </div>
        }
      </div>
      <div className="image">
        <img src={data.image ? `${BASE_PATH.FILES}/images/144/${data.image}` : default_image} alt={data.title} />
      </div>
      <div className="title">{data.title}</div>
      <div className="subtitle">{data.subtitle}</div>
    </div>
  );
};

ApeCardListItem.propTypes = {
  item: PropTypes.any.isRequired,
  editModal: PropTypes.any.isRequired,
  actions: PropTypes.any.isRequired,
  convert: PropTypes.shape(PropTypes.any).isRequired,
  removeModal: PropTypes.bool.isRequired,
};

export { ApeCardListItem };
