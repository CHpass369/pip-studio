import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '@mui/material';

import api from 'administrator/api/globals/v3';
import { toast } from 'generics/services/v4';
import { BUTTON_LABELS, RemoveDialog } from 'components/generics/v2';
import { FormLabels } from 'components/forms/v1';
import { Image } from 'components/images/v3';
import { ModelTitle } from 'components/titles/v3';
import { WButton } from 'components/forms/v3';
import { Flex } from 'components/grids/v5';
import { CONFIG_CONTEXT } from '../configuration.constants';

import { SearchAdministrators } from '../administrators/SearchAdministrators';
import { Group } from 'administrator/models/group.model';
import { AdministratorAccount } from 'administrator/models/administrator.model';

const AreaGroupDetail = () => {
  const { group_id } = useParams();
  const navigate = useNavigate();
  const [item, set_item] = useState<Partial<Group>>({
    accounts: [],
  });

  const on_update = () => {
    navigate(`/configuration/groups/${item._id}/update`);
  };

  const on_cancel = useCallback(() => {
    navigate('/configuration/groups');
  }, [navigate]);

  const on_remove_callback = useCallback(() => {
    api.groups.remove(item._id as string)
    .then(() => {
      navigate('/configuration/groups');
    })
    .catch(toast.api_danger);
  }, [navigate, item]);

  const update_accounts = useCallback((items: AdministratorAccount[]) => {
    api.groups.update(item._id as string, {
      accounts: items,
    })
    .catch(toast.api_danger);
  }, [item]);

  useEffect(() => {
    api.groups.get_by_id(group_id as string)
    .then(({ data }) => {
      set_item(data);
    })
    .catch(toast.api_danger);
  }, [group_id, set_item]);

  return (
    <FormLabels>
      <ModelTitle context={CONFIG_CONTEXT} title={item.name} description={item.description} />
      <Flex.End>
        <RemoveDialog on_click={on_remove_callback} disabled={false} />
        <Button variant="outlined" onClick={on_cancel}>{BUTTON_LABELS.CANCEL}</Button>
        <WButton variant="contained" on_click={on_update} label={BUTTON_LABELS.UPDATE} />
      </Flex.End>
      <Image image={item.image_id} direction={Image.H} height="150px" quality={1080} />
      <SearchAdministrators item={item} on_update={update_accounts} />
    </FormLabels>
  );
};

export { AreaGroupDetail };
