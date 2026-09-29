import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Flex } from 'components/grids/v5';
import { FormLabels } from 'components/forms/v1';
import { ContentTitle } from 'components/titles/v3';
import { Image } from 'components/images/v3';
import { AREA_DETAIL_TITLE } from '../account.constants';
import { Account } from '../models/account.model';

interface AccountDetailProps {
  account: Account;
}

const AccountDetail = ({ account }: AccountDetailProps) => {
  const [item] = useState(account);

  return (
    <>
      <ContentTitle config={AREA_DETAIL_TITLE} />
      <Flex.Scrap>
        <FormLabels>
          <FormLabels.Field>
            <FormLabels.Label value="Usuario" />
            <FormLabels.Input value={item.username} />
          </FormLabels.Field>
          <FormLabels.Field>
            <FormLabels.Label value="Apellido" />
            <FormLabels.Input value={item.last_name} />
          </FormLabels.Field>
          <FormLabels.Field>
            <FormLabels.Label value="Nombre" />
            <FormLabels.Input value={item.first_name} />
          </FormLabels.Field>
          <Image image={item.image_id} direction={Image.V} height="150px" quality={1080} />
        </FormLabels>
      </Flex.Scrap>
    </>
  );
};

AccountDetail.propTypes = {
  account: PropTypes.any.isRequired,
};

export { AccountDetail };
