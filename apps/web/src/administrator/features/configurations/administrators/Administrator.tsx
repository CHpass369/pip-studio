import React, { useState, useEffect, useCallback } from 'react';

import api from 'administrator/api/accounts/v3';
import { toast } from 'generics/services/v4';
import { IButton } from 'components/buttons/v2';
import { LinearListOptionItem } from 'components/lists/v1';
import { AdministratorAccount } from 'administrator/models/administrator.model';

interface AdministratorProps {
  item: AdministratorAccount;
  on_remove: (item: AdministratorAccount) => void;
}

const Administrator = ({ item, on_remove }: AdministratorProps) => {
  const [account, set_account] = useState({
    _id: '',
    name: '',
    description: '',
  });

  const render_options = (data: AdministratorAccount) => (
    <IButton label="eliminar" icon="cancel" on_click={() => on_remove(data)} />
  );

  const on_select = useCallback((data: any) => {
    /* eslint-disable no-console */
    console.log(data);
  }, []);

  useEffect(() => {
    api.accounts.get_by_id(item._id)
    .then(({ data }) => {
      set_account({
        _id: data._id,
        name: data.email,
        description: `${data.first_name} ${data.last_name}`,
      });
    })
    .catch(toast.api_danger);
  }, [item]);

  return (
    <LinearListOptionItem item={account} options={render_options} on_select={on_select} />
  );
};

export { Administrator };
