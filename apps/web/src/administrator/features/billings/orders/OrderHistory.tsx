import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import moment from 'moment';

import { GENERIC } from 'generics/constants';
import api from 'administrator/api/billings/v1';
import { Header, EmptyInfo } from 'components/titles/v3';
import { toast } from 'generics/services/v4';
import { Flex, Container } from 'components/grids/v3';
import { WButton } from 'components/forms/v3';

import { List } from './list/List';
import { generate_file } from '../utils/excel';
import { DateSelector } from '../utils/DateSelector';

interface OrderHistoryProps {
  area: {
    _id: string;
    name?: string;
    description?: string;
    image_id?: string | null;
  };
}

const OrderHistory = ({ area }: OrderHistoryProps) => {
  const navigate = useNavigate();
  const [items, set_items] = useState([]);

  const parse_data = () => (
    items.map((item) => ({
      numeracion: item.index,
      fecha: moment(item.completed).format('MM/DD/YYYY LT'),
      encargado: item.account_name,
      razon_social: item.customer_name,
      descripcion: item.description,
      precio: item.price,
      nombre: item.payment ? 'CERRADO' : 'PAGADO',
    }))
  );

  const on_search = useCallback((range) => {
    api.orders.report({ area_id: area._id, ...range })
    .then(({ data }) => {
      set_items(data);
    })
    .catch(toast.api_danger);
  }, [area]);

  const on_download = () => {
    generate_file(parse_data(), 'orders', 'orders');
  };

  const on_select = useCallback((item) => {
    navigate(`${GENERIC.APP_BASE_URL}/main/sales/${item._id}/invoices`);
  }, [navigate]);

  const on_create = useCallback(() => {
    navigate(`${GENERIC.APP_BASE_URL}/orders/create`);
  }, [navigate]);

  return (
    <Flex direction={Flex.V}>
      <Container width="1200px">
        <Header title="Lista de registros en el hotel" />
        <Flex.End>
          <WButton variant="contained" label="Nueva orden" on_click={on_create} />
        </Flex.End>
        <DateSelector on_search={on_search} on_download={on_download} />
        <Flex.Item>
          {(items.length === 0) && <EmptyInfo description="No existen órdenes registradas este dia" />}
          {(items.length > 0) && <List items={items} on_select={on_select} />}
        </Flex.Item>
      </Container>
    </Flex>
  );
};

export { OrderHistory };
