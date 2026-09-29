import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select,
} from '@mui/material';

import api from 'administrator/api/globals/v3';
import { toast } from 'generics/services/v4';
import { BUTTON_LABELS, RemoveDialog } from 'components/generics/v2';
import { ContentTitle } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import { useFormReducer } from 'generics/functions/forms/v2';
import { WButton, WTextField } from 'components/forms/v3';
import { UImage } from 'components/images/v3';
import { AREA_UPDATE_TITLE } from '../areas.constants';
import { Area } from 'administrator/models/area.model';
import { Group } from 'administrator/models/group.model';

const AreaUpdate = () => {
  const { area_id } = useParams();
  const navigate = useNavigate();
  const {
    item,
    set_item,
    on_string_change,
    on_checkbox_change,
  } = useFormReducer<Partial<Area>>({});
  const [groups, set_groups] = useState<Group[]>([]);

  const on_submit = () => {
    api.areas.update(item._id as string, item)
    .then(() => {
      navigate('/configuration/areas');
    })
    .catch(toast.api_danger);
  };

  const on_group_change = (event: any) => {
    set_item({ ...item, group_id: event.target.value });
  };

  const handle_image = useCallback((data: Partial<Area>) => {
    set_item((prev) => ({ ...prev, ...data }));
  }, [set_item]);

  const handle_banner = useCallback(({ image_id }: { image_id: string }) => {
    set_item((prev) => ({ ...prev, banner_id: image_id }));
  }, [set_item]);

  const on_remove_callback = useCallback(() => {
    api.areas.remove(item._id as string)
    .then(() => {
      navigate('/configuration/areas');
    })
    .catch(toast.api_danger);
  }, [navigate, item]);

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
    <Flex class_name="text-separator">
      <ContentTitle config={AREA_UPDATE_TITLE} />
      <Flex.Item>
        <Flex.Content>
          <WTextField name="name" label="Nombre" value={item.name} onChange={on_string_change} />
          <WTextField multiline rows={4} name="description" label="Descripción" value={item.description} onChange={on_string_change} />
          <FormControlLabel
            control={<Checkbox name="enabled" checked={!!item.enabled} onChange={on_checkbox_change} />}
            label="Está habilitado"
          />
          <FormControl fullWidth>
            <InputLabel id="area-group-label">Grupo</InputLabel>
            <Select labelId="area-group-label" label="Grupo" name="group_id" value={item.group_id || ''} onChange={on_group_change}>
              {groups.map((group) => (
                <MenuItem key={group._id} value={group._id}>{group.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <label>Logo</label>
          <UImage image={item.image_id} height="150px" quality={1080} on_callback={handle_image} />
          <label>Banner</label>
          <UImage image={item.banner_id ?? undefined} height="150px" on_callback={handle_banner} />
        </Flex.Content>
        <Flex.Buttoms>
          <RemoveDialog label={BUTTON_LABELS.REMOVE} on_click={on_remove_callback} />
          <WButton variant="contained" on_click={on_submit} label={BUTTON_LABELS.UPDATE} />
        </Flex.Buttoms>
      </Flex.Item>
    </Flex>
  );
};

export { AreaUpdate };
