import React, { useCallback, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import api from 'administrator/api/accounts/v3';
import { toast } from 'generics/services/v4';
import { FormLabels } from 'components/forms/v1';
import { Administrators } from './Administrators';
import { AdministratorAccount, HasAdministrators } from 'administrator/models/administrator.model';

interface SearchAdministratorsProps {
  item: HasAdministrators;
  on_update: (items: AdministratorAccount[]) => void;
}

const SearchAdministrators = ({ item, on_update }: SearchAdministratorsProps) => {
  const [value, set_value] = useState('');
  const [accounts, set_accounts] = useState<AdministratorAccount[]>([...(item.accounts || [])]);
  const [results, set_results] = useState<any[]>([]);

  const on_remove = useCallback((account: AdministratorAccount) => {
    const items = accounts.filter((data) => data._id !== account._id);
    set_accounts(items);
    on_update(items);
  }, [accounts, on_update]);

  const on_search_select = useCallback((selected: any) => {
    if (!selected) return;

    const is_select = accounts.find((data) => data._id === selected._id);
    if (is_select) return;

    const data: AdministratorAccount = {
      _id: selected._id,
      profiles: ['administrator'],
    };

    const items = [data, ...accounts];
    set_accounts(items);
    on_update(items);
  }, [accounts, on_update]);

  const on_search_change = useCallback((event: any, search: string) => {
    set_value(search);
    if (!search) {
      set_results([]);
      return;
    }

    api.accounts.find_user({ email: search })
    .then(({ data }) => {
      set_results(data);
    })
    .catch(toast.api_danger);
  }, []);

  useEffect(() => {
    set_accounts(item.accounts || []);
  }, [item]);

  return (
    <>
      <FormLabels.Field>
        <Autocomplete
          options={results}
          inputValue={value}
          getOptionLabel={(option) => option.email || ''}
          isOptionEqualToValue={(option, selected) => option._id === selected._id}
          renderOption={(props, option) => (
            <li {...props} key={option._id}>{option.email}</li>
          )}
          onInputChange={on_search_change}
          onChange={(event, selected) => on_search_select(selected)}
          renderInput={(params) => <TextField {...params} label="Buscar administrador" />}
        />
      </FormLabels.Field>
      <Administrators items={accounts} on_remove={on_remove} />
    </>
  );
};
export { SearchAdministrators };
