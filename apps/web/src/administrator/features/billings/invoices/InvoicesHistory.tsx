import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Select } from 'components/shims/semantic-ui';

import { GENERIC } from 'generics/constants';
import api from 'administrator/api/billings/v2';
import { Header, EmptyInfo } from 'components/titles/v3';
import { toast } from 'generics/services/v4';
import { Flex, Container } from 'components/grids/v3';
import { WButton } from 'components/forms/v3';

import { List } from './list/List';
import { get_month } from './utils';
import { generate_file_v2 } from '../utils/excel';

const InvoicesHistory = ({ area }) => {
  const navigate = useNavigate();
  const [items, set_items] = useState([]);
  const [months] = useState(get_month(area).reverse().slice(0, 10));
  const [month, set_month] = useState(months[0] ? months[0].value : null);

  const header = [
    'Nº',
    'ESPECIFICACION',
    'FECHA DE LA FACTURA',
    'N° DE LA FACTURA',
    'CODIGO DE AUTORIZACION',
    'NIT / CI CLIENTE',
    'COMPLEMENTO',
    'NOMBRE O RAZON SOCIAL',
    'IMPORTE TOTAL DE LA VENTA',
    'IMPORTE ICE',
    'IMPORTE IEHD',
    'IMPORTE IPJ',
    'TASAS',
    'OTROS NO SUJETOS AL IVA',
    'EXPORTACIONES Y OPERACIONES EXENTAS',
    'VENTAS GRAVADAS A TASA CERO',
    'SUBTOTAL',
    'DESCUENTOS, BONIFICACIONES Y REBAJAS SUJETAS AL IVA',
    'IMPORTE GIFT CARD',
    'IMPORTE BASE PARA DEBITO FISCAL',
    'DEBITO FISCAL',
    'ESTADO',
    'CODIGO DE CONTROL',
    'TIPO DE VENTA',
  ];

  const parse_data = () => (
    items.map((item, index) => ({
      numeracion: index + 1,
      specification: '2',
      created: moment(item.created).format('DD/MM/YYYY'),
      invoice_counter: item.invoice_counter,
      invoice_authorization_number: item.invoice_authorization_number,
      customer_index: item.customer_index,
      complement: '',
      customer_name: item.customer_name,
      total: Number(item.payment.total).toFixed(2),
      import_ice: '0.00', // 'IMPORTE ICE',
      import_iehd: '0.00', // 'IMPORTE IEHD',
      import_ipj: '0.00', // 'IMPORTE IPJ',
      rates: '0.00', // 'TASAS',
      others: '0.00', // 'OTROS NO SUJETOS AL IVA',
      operations: '0.00', // 'EXPORTACIONES Y OPERACIONES EXENTAS',
      sales: '0.00', // 'VENTAS GRAVADAS A TASA CERO',
      subtotal: Number(item.payment.total).toFixed(2), // 'SUBTOTAL',
      discount: '0.00', // 'DESCUENTOS, BONIFICACIONES Y REBAJAS SUJETAS AL IVA',
      gift: '0.00', // 'IMPORTE GIFT CARD',
      base: Number(item.payment.total).toFixed(2), // 'IMPORTE BASE PARA DEBITO FISCAL',
      debit: Number(item.payment.total * 0.13).toFixed(2), // 'DEBITO FISCAL',
      // eslint-disable-next-line
      state: true ? 'V' : '', // 'ESTADO',
      control_code_text: item.control_code_text, // 'CODIGO DE CONTROL',
      sale_type: '0', // 'TIPO DE VENTA',
    }))
  );

  const on_download = () => {
    generate_file_v2(header, parse_data(), 'facturas', 'facturas');
  };

  const on_generate = useCallback(() => {
    api.invoices.reports({
      area_id: area._id,
      start: month.start,
      end: month.end,
    })
    .then(({ data }) => {
      set_items(data);
    })
    .catch(toast.api_danger);
  }, [area, month]);

  const on_change = (event, element) => {
    set_month(element.value);
  };

  const on_select = useCallback((item) => {
    navigate(`${GENERIC.APP_BASE_URL}/main/sales/${item._id}/invoices`);
  }, [navigate]);

  useEffect(() => {
    on_generate();
  }, [on_generate]);

  return (
    <Flex direction={Flex.V}>
      <Container width="1250px">
        <Header title="facturas" />
        <Flex.End>
          <Select placeholder="Select your country" value={month} onChange={on_change} options={months} />
          <WButton variant="contained" on_click={on_download} label="Descargar" />
          <WButton variant="contained" on_click={on_generate} label="Generar" />
        </Flex.End>
        {
          month && (
            <Flex.End>
              <h3>{`${moment(month.start).format('MM/DD/YYYY')} - ${moment(month.end).format('MM/DD/YYYY')}`}</h3>
            </Flex.End>
          )
        }
        <Flex.Item>
          {(items.length === 0) && <EmptyInfo description="No existe facturas registradas" />}
          {(items.length > 0) && <List items={items} on_select={on_select} />}
        </Flex.Item>
      </Container>
    </Flex>
  );
};

InvoicesHistory.propTypes = {
  area: PropTypes.any.isRequired,
};

export { InvoicesHistory };
