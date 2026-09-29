import React from 'react';

import { ContentTitle, EmptyInfo } from 'components/titles/v3';
import { Container, Flex } from 'components/grids/v5';
import { List } from './List';
import { calculate } from './calculator';
import { Parameter } from 'app/models/parameter.model';

export const AREA_UPDATE_TITLE = {
  context: 'Projectos',
  title: 'Parametros de calculo',
  description: 'generator',
};

export const EMPTY_LIST_MESSAGE = 'No existe los parametros de calculo registradas';

interface CalcParametersProps {
  items: Parameter[];
  partials: number[];
  on_change: (parameter: Parameter) => void;
  display_parcial?: boolean;
  title?: boolean;
}

const CalcParameters = ({ items, partials, on_change, display_parcial = true, title = true }: CalcParametersProps) => {
  
  if (!items) return null;
  const budget = calculate(items, partials);

  return (
    <>
      {
        title && <ContentTitle config={AREA_UPDATE_TITLE} />
      }
      <Container width="1200px">
        <Flex.Item>
          {(items.length === 0) && <EmptyInfo description={EMPTY_LIST_MESSAGE} />}
          {(items.length > 0) && <List items={items} budget={budget} on_change={on_change} display_parcial={display_parcial} />}
        </Flex.Item>
      </Container>
      
    </>
  );
};

export { CalcParameters };
