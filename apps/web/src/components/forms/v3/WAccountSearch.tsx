import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete, TextField } from '@mui/material';

import accounts_service from 'administrator/api/accounts/v3';
import { toast } from 'generics/services/v4';
import { Account } from 'administrator/features/accounts/models/account.model';
import { WLinearListOption, LinearListOptionItem } from 'components/lists/v1';

import { WButton } from './WButton';

interface AccountListItemProps {
  account_id: string;
  on_remove: (account_id: string) => void;
}

const AccountListItem = ({ account_id, on_remove }: AccountListItemProps) => {
  const [account, set_account] = useState({
    _id: '',
    name: '',
    description: '',
  });

  const render_options = () => (
    <WButton variant="outlined" label="Eliminar" on_click={() => on_remove(account_id)} />
  );

  useEffect(() => {
    accounts_service.accounts.get_by_id(account_id)
    .then(({ data }) => {
      set_account({
        _id: data._id,
        name: data.email,
        description: `${data.first_name} ${data.last_name}`,
      });
    })
    .catch(toast.api_danger);
  }, [account_id]);

  return (
    <LinearListOptionItem item={account} options={render_options} />
  );
};

interface WAccountSearchProps {
  accounts: string[];
  on_select: (account: Account) => void;
  on_remove: (account_id: string) => void;
}

const WAccountSearch = ({ accounts, on_select, on_remove }: WAccountSearchProps) => {
  const [value, set_value] = useState('');
  const [results, set_results] = useState<Account[]>([]);
  const { loading } = useSelector((state: any) => state.loading);

  const on_search_change = useCallback((_e: any, search: string) => {
    set_value(search);

    if (!search) {
      set_results([]);
      return;
    }

    accounts_service.accounts.find_user({ email: search })
    .then(({ data }) => {
      set_results(data);
    })
    .catch(toast.api_danger);
  }, []);

  return (
    <>
      <WLinearListOption>
        {
          accounts.map((account_id) => (
            <AccountListItem key={account_id} account_id={account_id} on_remove={on_remove} />
          ))
        }
      </WLinearListOption>
      <Autocomplete
        size="small"
        loading={loading}
        options={results}
        inputValue={value}
        getOptionLabel={(option: Account) => option.email || ''}
        isOptionEqualToValue={(option: Account, selected: Account) => option._id === selected._id}
        renderOption={(props, option: Account) => (
          <li {...props} key={option._id}>{option.email}</li>
        )}
        onInputChange={on_search_change}
        onChange={(_e, selected: Account | null) => {
          if (!selected) return;
          on_select(selected);
          set_value('');
        }}
        renderInput={(params) => <TextField {...params} label="Buscar cuenta" size="small" />}
      />
    </>
  );
};

export { WAccountSearch };
