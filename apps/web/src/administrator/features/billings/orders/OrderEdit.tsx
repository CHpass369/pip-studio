import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Form } from 'components/shims/semantic-ui';

import { GENERIC } from 'generics/constants';
import api from 'administrator/api/billings/v1';
import { toast } from 'generics/services/v4';
import { Flex } from 'components/grids/v5';
import loader from 'generics/services/v4/loader.service';
import { useFormReducer } from 'generics/functions/forms/v2';
import { WButton } from 'components/forms/v3';
import { ContentTitle } from 'components/titles/v3';
import { to_new_order, OrderProduct } from 'app/models/order.model';

import { CASH_TYPES, PAYMENT_TYPES, TICKET_TYPES } from '../../../../app/kiosk/point/billings/sales.constants';
import { ORDER_HEADER } from './constants';

interface OrderEditProps {
  area: { _id: string };
}

const EMPTY_PRODUCT: OrderProduct = { name: '', amount: 1, price: 0 };

const OrderEdit = ({ area }: OrderEditProps) => {
  const navigate = useNavigate();
  const { account } = useSelector((state: any) => state.auth);
  const {
    item,
    set_item,
    on_string_change,
  } = useFormReducer(to_new_order({
    area_id: area._id,
    account_id: account._id,
    account,
    order_type: 'console',
  }));
  const [draft, set_draft] = useState<OrderProduct>(EMPTY_PRODUCT);

  const total = item.products.reduce(
    (sum: number, product: OrderProduct) => sum + (product.price * product.amount), 0,
  );

  const on_draft_change = (event: any) => {
    const { name, value } = event.target;
    set_draft({
      ...draft,
      [name]: (name === 'name') ? value : (parseFloat(value) || 0),
    });
  };

  const on_add_product = () => {
    if (!draft.name || draft.amount <= 0) return;
    set_item({ ...item, products: [...item.products, draft] });
    set_draft(EMPTY_PRODUCT);
  };

  const on_remove_product = (index: number) => {
    set_item({ ...item, products: item.products.filter((_: OrderProduct, i: number) => i !== index) });
  };

  const on_submit = (e: any) => {
    e.preventDefault();
    if (!item.products.length) {
      toast.danger('Agrega al menos un producto');
      return;
    }

    loader.resolve()
    .then(loader.start)
    .then(() => api.orders.create(item))
    .then(() => {
      navigate(`${GENERIC.APP_BASE_URL}/orders`);
    })
    .then(loader.stop)
    .catch(loader.error)
    .catch(toast.api_danger);
  };

  return (
    <>
      <ContentTitle config={ORDER_HEADER} />
      <Form onSubmit={on_submit} inverted>
        <Form.Field>
          <label>Producto</label>
          <input name="name" placeholder="Producto" value={draft.name} onChange={on_draft_change} />
        </Form.Field>
        <Form.Field>
          <label>Cantidad</label>
          <input name="amount" type="number" placeholder="Cantidad" value={draft.amount} onChange={on_draft_change} />
        </Form.Field>
        <Form.Field>
          <label>Precio</label>
          <input name="price" type="number" placeholder="Precio" value={draft.price} onChange={on_draft_change} />
        </Form.Field>
        <Flex.End>
          <WButton type="button" variant="outlined" label="Agregar producto" on_click={on_add_product} />
        </Flex.End>

        {item.products.map((product: OrderProduct, index: number) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${product.name}-${index}`}
            style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}
          >
            <span>{product.name} x{product.amount}</span>
            <span>{product.price * product.amount}</span>
            <WButton type="button" variant="text" label="Quitar" on_click={() => on_remove_product(index)} />
          </div>
        ))}

        <Form.Field>
          <label>Total</label>
          <input name="total" value={total} disabled />
        </Form.Field>

        <Form.Field>
          <label>Descripción</label>
          <textarea name="description" placeholder="Descripción" value={item.description} onChange={on_string_change} />
        </Form.Field>

        <Form.Field>
          <label>Moneda</label>
          <select name="coin_type" value={item.coin_type} onChange={on_string_change}>
            {CASH_TYPES.map((option) => (
              <option key={option.key} value={option.key}>{option.value}</option>
            ))}
          </select>
        </Form.Field>

        <Form.Field>
          <label>Tipo de pago</label>
          <select name="payment_type" value={item.payment_type} onChange={on_string_change}>
            {PAYMENT_TYPES.map((option) => (
              <option key={option.key || ''} value={option.key || ''}>{option.value}</option>
            ))}
          </select>
        </Form.Field>

        <Form.Field>
          <label>Tipo de orden</label>
          <select name="ticket_type" value={item.ticket_type || ''} onChange={on_string_change}>
            {TICKET_TYPES.map((option) => (
              <option key={option.key || ''} value={option.key || ''}>{option.value}</option>
            ))}
          </select>
        </Form.Field>

        <Flex.End>
          <WButton type="submit" variant="contained" label="Crear orden" />
        </Flex.End>
      </Form>
    </>
  );
};

export { OrderEdit };
