import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router';
import { Form } from 'components/shims/semantic-ui';
import { useSelector } from 'react-redux';

import { Header, EmptyInfo } from 'components/titles/v3';
import { GENERIC } from 'generics/constants';
import api from 'administrator/api/billings/v2';
import { toast } from 'generics/services/v4';
import { Flex } from 'components/grids/v5';
import { useFormReducer } from 'generics/functions/forms/v2';
import { BUTTON_LABELS, RemoveDialog } from 'components/generics/v2';
import { WButton, WDateField } from 'components/forms/v3';
import { List } from './terminate_list/List';

const TerminatesEdit = ({ area }) => {
  const { account } = useSelector((state: any) => state.auth);
  const { buy_id } = useParams();
  const navigate = useNavigate();
  const {
    item,
    set_item,
    on_string_change,
  } = useFormReducer({
    name: 'Cerrar caja',
    start: null,
    end: null,
    sale_ids: [],
    buy_ids: [],
    buys_total: 0,
    sales_total: 0,
    account_id: account._id,
  });
  const [is_new] = useState(buy_id === undefined);
  const [range, set_range] = useState({
    start: moment().startOf('day').toDate(),
    end: moment().endOf('day').toDate(),
  });
  const [sale_items, set_sale_items] = useState([]);
  const [buy_items, set_buy_items] = useState([]);
  const [sales_total, set_sales_total] = useState(0);
  const [buys_total, set_buys_total] = useState(0);

  const on_submit = (e: any) => {
    e.preventDefault();
    if (is_new) {
      const new_item = {
        ...item,
        area_id: area._id,
        start: range.start,
        end: range.end,
        sale_ids: sale_items.map((data) => data._id, 0),
        buy_ids: buy_items.map((data) => data._id, 0),
        buys_total,
        sales_total,
      };
      api.terminates.create(new_item)
      .then(() => {
        navigate(`${GENERIC.APP_BASE_URL}/terminates`);
      })
      .catch(toast.api_danger);
    } else {
      api.terminates.update(item._id, item)
      .then(() => {
        navigate(`${GENERIC.APP_BASE_URL}/terminates`);
      })
      .catch(toast.api_danger);
    }
  };

  const on_search = useCallback((query) => {
    api.sales.terminate({ area_id: area._id, ...query })
    .then(({ data }) => {
      set_sale_items(data);
      set_sales_total(data.reduce((total, value) => total + value.total, 0));
    })
    .catch(toast.api_danger);
    api.buys.terminate({ area_id: area._id, ...query })
    .then(({ data }) => {
      set_buy_items(data);
      set_buys_total(data.reduce((total, value) => total + value.total, 0));
    })
    .catch(toast.api_danger);
  }, [area]);

  const on_update = () => {
    on_search(range);
  };

  const on_remove_callback = useCallback(() => {
    api.buys.remove(item)
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

  useEffect(() => {
    on_search(range);
  }, [range, on_search]);

  const render_dates = () => {
    const start = moment(range.start).format('YYYY-MM-DD');
    const end = moment(range.end).format('YYYY-MM-DD');

    const on_start_date_change = (event: any) => {
      set_range({ ...range, start: moment(event.target.value).startOf('day').toDate() });
    };

    const on_end_date_change = (event: any) => {
      set_range({ ...range, end: moment(event.target.value).endOf('day').toDate() });
    };

    return (
      <>
        <WDateField name="start" label="Desde" value={start} onChange={on_start_date_change} />
        <WDateField name="end" label="Hasta" value={end} onChange={on_end_date_change} />
        <WButton variant="contained" on_click={on_update} label="Buscar" />
      </>
    );
  };

  return (
    <>
      <Header title="Caja diaria" />
      <Form onSubmit={on_submit} inverted>
        <Form.Field>
          <label>Nombre</label>
          <input name="name" placeholder="Nombre" value={item.name} onChange={on_string_change} />
        </Form.Field>
        <Flex.End>
          {render_dates()}
        </Flex.End>
        <Header title={`Ventas ${sales_total} Bs.`} />
        <Flex.Item>
          {(sale_items.length === 0) && <EmptyInfo description="No existe ventas registradas" />}
          {(sale_items.length > 0) && <List items={sale_items} on_select={() => {}} />}
        </Flex.Item>
        <Header title={`Compras ${buys_total} Bs.`} />
        <Flex.Item>
          {(buy_items.length === 0) && <EmptyInfo description="No existe compras registradas" />}
          {(buy_items.length > 0) && <List items={buy_items} on_select={() => {}} />}
        </Flex.Item>
        <Flex.End>
          <Header title={`${sales_total} - ${buys_total} = ${sales_total - buys_total}Bs.`} />
        </Flex.End>
        <Flex.End>
          {!is_new && <RemoveDialog label={BUTTON_LABELS.REMOVE} on_click={on_remove_callback} />}
          {is_new && <WButton type="submit" variant="contained" label="Cerrar caja" />}
          {!is_new && <WButton type="submit" variant="contained" label={BUTTON_LABELS.UPDATE} />}
        </Flex.End>
      </Form>
    </>
  );
};

TerminatesEdit.propTypes = {
  area: PropTypes.any.isRequired,
};

export { TerminatesEdit };
