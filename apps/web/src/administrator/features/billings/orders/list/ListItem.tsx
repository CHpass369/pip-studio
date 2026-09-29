import React from 'react';
import moment from 'moment';

import { Flex } from 'components/grids/v5';
import { Button } from 'components/buttons/v2';

const ORDER_TYPE_LABELS: Record<string, string> = {
  market: 'Market',
  kiosk: 'Kiosk',
  console: 'Console',
};

interface ListItemProps {
  item: any;
  on_select: (item: any) => void;
}

const ListItem = ({ item, on_select }: ListItemProps) => {
  const on_click = () => {
    on_select(item);
  };

  const render_payment_state = (payment) => {
    if (payment) {
      return <Button label="Pagado" color="green" icon="clock outline" on_click={on_click} />;
    }

    return <Button label="Cerrado" color="red" icon="clock outline" on_click={() => {}} />;
  };

  return (
    <Flex.Scrap class_name="report-list-item">
      <Flex direction={Flex.H}>
        <Flex.Item flex={1}>
          {item.index}
        </Flex.Item>
        <Flex.Item flex={2}>
          {ORDER_TYPE_LABELS[item.order_type] || '-'}
        </Flex.Item>
        <Flex.Item flex={3}>
          {item.account_name}
        </Flex.Item>
        <Flex.Item flex={3}>
          {item.customer_name}
        </Flex.Item>
        <Flex.Item flex={5}>
          {item.description}
        </Flex.Item>
        <Flex.Item flex={2}>
          {`${item.price} Bs.`}
        </Flex.Item>
        <Flex.Item flex={2}>
          {render_payment_state(item.payment)}
        </Flex.Item>
        <Flex.Item flex={3}>
          {moment(item.completed).format('MM/DD/YYYY LT')}
        </Flex.Item>
      </Flex>
    </Flex.Scrap>
  );
};

export { ListItem };
