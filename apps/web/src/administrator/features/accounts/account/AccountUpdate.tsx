import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import setting_actions from 'store/actions/settings';
import api from 'administrator/api/accounts/v3';
import { useFormReducer } from 'generics/functions/forms/v2';
import { toast } from 'generics/services/v4';

import { ContentTitle } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import { WTextField } from 'components/forms/v3';
import { UImage } from 'components/images/v3';
import { AREA_UPDATE_TITLE } from '../account.constants';
import { Account } from '../models/account.model';

interface AccountUpdateProps {
  account: Account;
}

const AccountUpdate = ({ account }: AccountUpdateProps) => {
  const dispatch = useDispatch();
  const {
    item,
    set_item,
    on_string_change,
  } = useFormReducer<Partial<Account>>({
    _id: account._id,
    username: account.username,
    first_name: account.first_name,
    last_name: account.last_name,
    image_id: account.image_id,
  });

  const on_submit = () => {
    api.accounts.update(item._id as string, item)
    .then(({ data }) => {
      dispatch(setting_actions.accounts.set(data));
      toast.success('se actualizo correctamente');
    })
    .catch(toast.api_danger);
  };

  const handle_image = useCallback((data: Partial<Account>) => {
    set_item((prev) => ({ ...prev, ...data }));
  }, [set_item]);

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={AREA_UPDATE_TITLE} />
      <Flex.Item>
        <Flex.Content>
          <WTextField name="username" label="Usuario" value={item.username} onChange={on_string_change} />
          <WTextField name="last_name" label="Apellido" value={item.last_name} onChange={on_string_change} />
          <WTextField name="first_name" label="Nombre" value={item.first_name} onChange={on_string_change} />
          <UImage image={item.image_id} height="150px" quality={1080} on_callback={handle_image} />
        </Flex.Content>
        <Flex.Buttoms>
          <Button variant="contained" onClick={on_submit}>Actualizar información</Button>
        </Flex.Buttoms>
      </Flex.Item>
    </Flex>
  );
};

AccountUpdate.propTypes = {
  account: PropTypes.any.isRequired,
};

export { AccountUpdate };
