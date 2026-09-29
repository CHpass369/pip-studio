import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { WButton, WDateField } from 'components/forms/v3';
import { Flex } from 'components/grids/v5';

const DateSelector = ({ on_search, on_download }) => {
  const [range, set_range] = useState({
    start: moment()
    .startOf('day')
    .subtract(6, 'days')
    .toDate(),
    end: moment()
    .endOf('day')
    .toDate(),
  });

  const onHandleToday = useCallback((item) => {
    switch (item) {
    case 'today':
      set_range({
        start: moment().startOf('day').toDate(),
        end: moment().endOf('day').toDate(),
      });
      break;
    case 'yesterday': {
      const start = moment()
      .startOf('day')
      .subtract(1, 'days')
      .toDate();
      const end = moment()
      .endOf('day')
      .subtract(1, 'days')
      .toDate();

      set_range({
        start,
        end,
      });
      break;
    }
    case 'week': {
      const start = moment()
      .startOf('day')
      .startOf('week')
      .toDate();
      const end = moment()
      .endOf('day')
      .endOf('week')
      .toDate();

      set_range({
        start,
        end,
      });
      break;
    }
    case '7_days': {
      const start = moment()
      .startOf('day')
      .subtract(6, 'days')
      .toDate();
      const end = moment()
      .endOf('day')
      .toDate();

      set_range({
        start,
        end,
      });
      break;
    }
    case '30_days': {
      const start = moment()
      .startOf('day')
      .subtract(29, 'days')
      .toDate();
      const end = moment()
      .endOf('day')
      .toDate();

      set_range({
        start,
        end,
      });
      break;
    }
    case 'month': {
      const start = moment()
      .startOf('day')
      .startOf('month')
      .toDate();
      const end = moment()
      .endOf('day')
      .endOf('month')
      .toDate();

      set_range({
        start,
        end,
      });
      break;
    }
    case 'previous': {
      const start = moment(range.start)
      .subtract(1, 'days')
      .toDate();
      const end = moment(range.end)
      .subtract(1, 'days')
      .toDate();

      set_range({
        start,
        end,
      });
      break;
    }
    default:
      // eslint-disable-next-line
      console.log(`${item} case does not exist`);
      break;
    }
  }, [range]);

  const on_update = () => {
    on_search(range);
  };

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
      <Flex.End>
        <WButton variant="contained" on_click={on_update} label="Actualizar" />
        <WButton variant="contained" on_click={() => onHandleToday('today')} label="Hoy dia" />
        <WButton variant="contained" on_click={() => onHandleToday('yesterday')} label="Ayer" />
        <WButton variant="contained" on_click={() => onHandleToday('previous')} label="Dia anterior" />
        <WButton variant="contained" on_click={() => onHandleToday('7_days')} label="7 dias" />
        <WButton variant="contained" on_click={() => onHandleToday('30_days')} label="30 dias" />
        <WButton variant="contained" on_click={() => onHandleToday('week')} label="Semana" />
        <WButton variant="contained" on_click={() => onHandleToday('month')} label="Este mes" />
        <WButton variant="contained" on_click={on_download} label="Descargar" />
      </Flex.End>
      <Flex.End>
        {render_dates()}
      </Flex.End>
      <Flex.End>
        <h3>{`${moment(range.start).format('MM/DD/YYYY')} - ${moment(range.end).format('MM/DD/YYYY')}`}</h3>
      </Flex.End>
    </>
  );
};

DateSelector.propTypes = {
  on_search: PropTypes.func.isRequired,
  on_download: PropTypes.func.isRequired,
};

export { DateSelector };
