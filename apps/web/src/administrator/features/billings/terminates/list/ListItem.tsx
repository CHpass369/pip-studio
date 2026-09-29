import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Flex } from 'components/grids/v5';

const ListItem = ({ item, on_select }) => {
  const on_click = (e: any) => {
    e.stopPropagation();
    on_select(item);
  };

  return (
    <Flex.Scrap class_name="report-list-item">
      <div onClick={on_click}>
        <Flex direction={Flex.H}>
          <Flex.Item flex={3}>
            {moment(item.start).format('MM/DD/YYYY LT')}
          </Flex.Item>
          <Flex.Item flex={3}>
            {moment(item.end).format('MM/DD/YYYY LT')}
          </Flex.Item>
          <Flex.Item flex={5}>
            {item.name}
          </Flex.Item>
          <Flex.Item flex={2} class_name="right">
            {`${item.sales_total} Bs.`}
          </Flex.Item>
          <Flex.Item flex={2} class_name="right">
            {`${item.buys_total} Bs.`}
          </Flex.Item>
          <Flex.Item flex={2} class_name="right">
            {`${item.sales_total - item.buys_total} Bs.`}
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
