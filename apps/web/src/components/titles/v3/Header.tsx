import { Flex } from 'components/grids/v5';

import './Header.scss';

const Header = ({ title }) => (
  <Flex.Scrap class_name="content-3-title">
    <h1>{title}</h1>
  </Flex.Scrap>
);

export { Header };
