import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Flex } from 'components/grids/v5';

const ListItem = ({ index, item, on_select }) => {
  const on_click = (e: any) => {
    e.stopPropagation();
    on_select(item);
  };

  return (
    <Flex.Scrap class_name="report-list-item">
      <div onClick={on_click}>
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}>
            {index}
          </Flex.Item>
          <Flex.Item flex={3}>
            {moment(item.created).format('DD/MM/YYYY LT')}
          </Flex.Item>
          <Flex.Item flex={2}>
            {item.invoice_counter}
          </Flex.Item>
          <Flex.Item flex={3}>
            {item.invoice_authorization_number}
          </Flex.Item>
          <Flex.Item flex={2}>
            {item.customer_index}
          </Flex.Item>
          <Flex.Item flex={5}>
            {item.customer_name}
          </Flex.Item>
          <Flex.Item flex={3}>
            {item.control_code_text}
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
  index: PropTypes.number.isRequired,
  item: PropTypes.any.isRequired,
  on_select: PropTypes.func.isRequired,
};

export { ListItem };
