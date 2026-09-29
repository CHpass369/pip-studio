import { Route } from 'react-router';

import { Flex, FormContainer } from 'components/grids/v2';
import { Area } from 'administrator/models/area.model';

import { OrderHistory } from './OrderHistory';
import { OrderEdit } from './OrderEdit';

const routes = (area: Area) => (
  <>
    <Route path="orders" element={<OrderHistory area={area} />} />
    <Route
      path="orders/create"
      element={(
        <Flex.Center>
          <FormContainer>
            <OrderEdit area={area} />
          </FormContainer>
        </Flex.Center>
      )}
    />
  </>
);

export { routes };
