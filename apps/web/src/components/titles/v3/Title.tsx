import { Flex } from 'components/grids/v5';

import './Title.scss';

const Title = ({ value }) => (
  <Flex.Scrap class_name="content-3-title-title">
    <h3>{value}</h3>
  </Flex.Scrap>
);

export { Title };
