import { Flex } from 'components/grids/v5';

import './ContentTitle.scss';

interface ContentTitleConfig {
  context?: string;
  title?: string;
}

interface ContentTitleProps {
  config?: ContentTitleConfig;
}

const ContentTitle = ({ config }: ContentTitleProps) => (
  <Flex.Scrap class_name="content-title">
    {
      config && (
        <>
          <h5>{config.context}</h5>
          <h1>{config.title}</h1>
        </>
      )
    }
  </Flex.Scrap>
);

export { ContentTitle };
