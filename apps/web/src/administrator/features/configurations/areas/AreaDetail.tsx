import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Button, FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';

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
import { Area } from 'administrator/models/area.model';
import { AdministratorAccount } from 'administrator/models/administrator.model';
import { Group } from 'administrator/models/group.model';

const AreaDetail = () => {
  const { area_id } = useParams();
  const navigate = useNavigate();
  const [item, set_item] = useState<Partial<Area>>({
    accounts: [],
  });
  const [groups, set_groups] = useState<Group[]>([]);

  const on_update = () => {
    navigate(`/configuration/areas/${item._id}/update`);
  };

  const on_cancel = useCallback(() => {
    navigate('/configuration/areas');
  }, [navigate]);

  const on_remove_callback = useCallback(() => {
    api.areas.remove(item._id as string)
    .then(() => {
      navigate('/configuration/areas');
    })
    .catch(toast.api_danger);
  }, [navigate, item]);

  const update_accounts = useCallback((items: AdministratorAccount[]) => {
    api.areas.update(item._id as string, {
      accounts: items,
    })
    .catch(toast.api_danger);
  }, [item]);

  const on_group_change = useCallback((event: any) => {
    const group_id = event.target.value;
    set_item((prev) => ({ ...prev, group_id }));

    api.areas.update(item._id as string, { group_id })
    .catch(toast.api_danger);
  }, [item]);

  useEffect(() => {
    api.areas.get_by_id(area_id as string)
    .then(({ data }) => {
      set_item(data);
    })
    .catch(toast.api_danger);

    api.groups.find({})
    .then(({ data }) => {
      set_groups(data);
    })
    .catch(toast.api_danger);
  }, [area_id, set_item]);

  return (
    <FormLabels>
      <ModelTitle context={CONFIG_CONTEXT} title={item.name} description={item.description} />
      <Flex.End>
        <RemoveDialog on_click={on_remove_callback} disabled={false} />
        <Button variant="outlined" onClick={on_cancel}>{BUTTON_LABELS.CANCEL}</Button>
        <WButton variant="contained" on_click={on_update} label={BUTTON_LABELS.UPDATE} />
      </Flex.End>
      <FormLabels.Field>
        <FormLabels.Label value="Nombre" />
        <FormLabels.Input value={item.name} />
      </FormLabels.Field>
      <FormLabels.Field>
        <FormLabels.Label value="Descripción" />
        <FormLabels.Input value={item.description} />
      </FormLabels.Field>
      <FormLabels.Field>
        <FormControl fullWidth>
          <InputLabel id="area-detail-group-label">Grupo</InputLabel>
          <Select labelId="area-detail-group-label" label="Grupo" name="group_id" value={item.group_id || ''} onChange={on_group_change}>
            {groups.map((group) => (
              <MenuItem key={group._id} value={group._id}>{group.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormLabels.Field>
      <Image image={item.image_id} direction={Image.H} height="150px" quality={1080} />
      <SearchAdministrators item={item} on_update={update_accounts} />
    </FormLabels>
  );
};

export { AreaDetail };
