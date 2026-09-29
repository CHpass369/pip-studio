import { Route } from 'react-router';

import { Flex, FormContainer } from 'components/grids/v2';
import { Area } from 'administrator/models/area.model';

import { TerminatesEdit } from './TerminatesEdit';
import { TerminatesHistory } from './TerminatesHistory';

const routes = (area: Area) => (
  <>
    <Route path="terminates" element={<TerminatesHistory area={area} />} />
    <Route
      path="terminates/create"
      element={(
        <Flex.Center>
          <FormContainer>
            <TerminatesEdit area={area} />
          </FormContainer>
        </Flex.Center>
      )}
    />
  </>
);

export { routes };
