import { Route } from 'react-router';

import { Flex, FormContainer } from 'components/grids/v2';
import { Area } from 'administrator/models/area.model';

import { BuysEdit } from './BuysEdit';
import { BuysHistory } from './BuysHistory';

const routes = (area: Area) => (
  <>
    <Route path="buys" element={<BuysHistory area={area} />} />
    <Route
      path="buys/create"
      element={(
        <Flex.Center>
          <FormContainer>
            <BuysEdit area={area} />
          </FormContainer>
        </Flex.Center>
      )}
    />
    <Route
      path="buys/:buy_id"
      element={(
        <Flex.Center>
          <FormContainer>
            <BuysEdit area={area} />
          </FormContainer>
        </Flex.Center>
      )}
    />
  </>
);

export { routes };
