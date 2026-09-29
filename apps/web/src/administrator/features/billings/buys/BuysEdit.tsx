import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router';
import { Form } from 'components/shims/semantic-ui';
import { useSelector } from 'react-redux';

import { GENERIC } from 'generics/constants';
import api from 'administrator/api/billings/v2';
import { toast } from 'generics/services/v4';
import { Flex } from 'components/grids/v5';
import loader from 'generics/services/v4/loader.service';
import { useFormReducer } from 'generics/functions/forms/v2';
import { BUTTON_LABELS, RemoveDialog } from 'components/generics/v2';
import { WButton } from 'components/forms/v3';
import { ITEM_HEADER } from './constants';
import { ContentTitle } from 'components/titles/v3';

const BuysEdit = ({ area }) => {
  const { account } = useSelector((state: any) => state.auth);
  const { buy_id } = useParams();
  const navigate = useNavigate();
  const {
    item,
    set_item,
    on_string_change,
    on_number_change,
  } = useFormReducer({
    index: 0,
    price: 1,
    amount: 1,
    description: 'Compra regular',
    area_id: area._id,
    closed: false,
    account_id: account._id,
    account_name: account.first_name,
    image_ids: [],
  });
  const [is_new] = useState(buy_id === undefined);

  const on_submit = (e: any) => {
    e.preventDefault();
    if (is_new) {
      loader.resolve()
      .then(loader.start)
      .then(() => api.buys.create(item))
      .then(() => {
        navigate(`${GENERIC.APP_BASE_URL}/buys`);
      })
      .then(loader.stop)
      .catch(loader.error)
      .catch(toast.api_danger);
    } else {
      loader.resolve()
      .then(loader.start)
      .then(() => api.buys.update(item._id, item))
      .then(() => {
        navigate(`${GENERIC.APP_BASE_URL}/buys`);
      })
      .then(loader.stop)
      .catch(loader.error)
      .catch(toast.api_danger);
    }
  };

  const on_remove_callback = useCallback(() => {
    api.buys.remove(item._id)
    .then(() => {
      navigate(`${GENERIC.APP_BASE_URL}/buys`);
    })
    .catch(toast.api_danger);
  }, [navigate, item]);

  useEffect(() => {
    if (is_new) return;

    api.buys.get_by_id(buy_id)
    .then(({ data }) => {
      set_item(data);
    })
    .catch(toast.api_danger);
  }, [is_new, buy_id, area, set_item]);

  return (
    <>
      <ContentTitle config={ITEM_HEADER} />
      <Form onSubmit={on_submit} inverted>
        <Form.Field>
          <label>Producto</label>
          <input name="name" placeholder="Producto" value={item.name} onChange={on_string_change} />
        </Form.Field>
        <Form.Field>
          <label>Descripción</label>
          <textarea name="description" placeholder="Descripción" value={item.description} onChange={on_string_change} />
        </Form.Field>
        <Form.Field>
          <label>Precio</label>
          <input name="price" type="number" placeholder="Precio" value={item.price} onChange={on_number_change} />
        </Form.Field>
        <Form.Field>
          <label>Cantidad</label>
          <input name="amount" type="number" placeholder="Cantidad" value={item.amount} onChange={on_number_change} />
        </Form.Field>
        <Form.Field>
          <label>Total</label>
          <input name="total" placeholder="Total" value={item.price * item.amount} onChange={on_number_change} disabled />
        </Form.Field>
        <Flex.End>
          {!is_new && <RemoveDialog label={BUTTON_LABELS.REMOVE} on_click={on_remove_callback} />}
          {is_new && <WButton type="submit" variant="contained" label={BUTTON_LABELS.CREATE} />}
          {!is_new && <WButton type="submit" variant="contained" label={BUTTON_LABELS.UPDATE} />}
        </Flex.End>
      </Form>
    </>
  );
};

BuysEdit.propTypes = {
  area: PropTypes.any.isRequired,
};

export { BuysEdit };
