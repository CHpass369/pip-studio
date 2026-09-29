import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Flex } from 'components/grids/v5';
import { Circle } from 'components/elements/v2';

const ListItem = ({ item, on_select }) => {
  const on_click = (e: any) => {
    e.stopPropagation();
    on_select(item);
  };

  return (
    <Flex.Scrap class_name="report-list-item">
      <div onClick={on_click}>
        <Flex direction={Flex.H}>
          <Flex.Scrap>
            <Circle active={item.closed} />
          </Flex.Scrap>
          <Flex.Item flex={1}>
            {item.index}
          </Flex.Item>
          <Flex.Item flex={3}>
            {moment(item.completed).format('MM/DD/YYYY LT')}
          </Flex.Item>
          <Flex.Item flex={2}>
            {item.account_name}
          </Flex.Item>
          <Flex.Item flex={2}>
            {item.invoice_counter}
          </Flex.Item>
          <Flex.Item flex={2}>
            {item.customer_index}
          </Flex.Item>
          <Flex.Item flex={3}>
            {item.customer_name}
          </Flex.Item>
          <Flex.Item flex={5}>
            {item.description}
          </Flex.Item>
          <Flex.Item flex={2} class_name="right">
            {`${item.payment.total} Bs.`}
          </Flex.Item>
        </Flex>
      </div>
    </Flex.Scrap>
  );
};

ListItem.propTypes = {
  item: PropTypes.any.isRequired,
  on_select: PropTypes.func.isRequired,
};

export { ListItem };
