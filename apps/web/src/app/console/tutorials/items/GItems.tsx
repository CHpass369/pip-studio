import { Flex } from 'components/grids/v5';
import { ContentTitle } from 'components/titles/v3';

import { List } from './list/List';
import { ITEMS_HEADER, TUTORIALS } from '../constants';

const GItems = () => (
  <Flex class_name="text-separator">
    <ContentTitle config={ITEMS_HEADER} />

    <Flex.Item>
      <List items={TUTORIALS} />
    </Flex.Item>
  </Flex>
);

export { GItems };
