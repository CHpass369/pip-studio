import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Statistic } from 'components/shims/semantic-ui';

import { GENERIC } from 'generics/constants';
import api from 'administrator/api/billings/v2';
import { Header, EmptyInfo } from 'components/titles/v3';
import { toast } from 'generics/services/v4';
import { Flex, Container } from 'components/grids/v3';

import { List } from './list/List';
import { generate_file } from '../utils/excel';
import { DateSelector } from '../utils/DateSelector';

const SalesHistory = ({ area }) => {
  const navigate = useNavigate();
  const [totals, set_totals] = useState({
    sale: 0,
  });
  const [items, set_items] = useState([]);

  const parse_data = () => (
    items.map((item) => ({
      numeracion: item.index,
      fecha: moment(item.completed).format('MM/DD/YYYY LT'),
      encargado: item.account_name,
      factura: item.invoice_counter,
      ci_nit: item.customer_index,
      cliente: item.customer_name,
      descripcion: item.description,
      total: item.payment.total,
      saldado: item.closed,
    }))
  );

  const on_search = useCallback((range) => {
    api.sales.reports({ area_id: area._id, ...range })
    .then(({ data }) => {
      set_items(data);
      set_totals({
        sale: data.reduce((total, item) => total + item.payment.total, 0),
      });
    })
    .catch(toast.api_danger);
  }, [area]);

  const on_download = () => {
    generate_file(parse_data(), 'ventas', 'ventas');
  };

  const on_select = useCallback((item) => {
    navigate(`${GENERIC.APP_BASE_URL}/main/sales/${item._id}/invoices`);
  }, [navigate]);

  return (
    <Flex.Item>
      <Container width="1100px">
        <Flex direction={Flex.V}>
          <Header title="Pagos completados" />
          <Flex.Scrap>
            <Flex direction={Flex.H}>
              <Statistic label="Total de ventas ultimos 7 dias" value={totals.sale} size="tiny" inverted />
              <Flex direction={Flex.V}>
                <DateSelector on_search={on_search} on_download={on_download} />
              </Flex>
            </Flex>
          </Flex.Scrap>
          <Flex.Item>
            {(items.length === 0) && <EmptyInfo description="No existe ventas registradas este dia" />}
            {(items.length > 0) && <List items={items} on_select={on_select} />}
          </Flex.Item>
        </Flex>
      </Container>
    </Flex.Item>
  );
};
SalesHistory.propTypes = {
  area: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    image_id: PropTypes.string,
  }).isRequired,
};

export { SalesHistory };
