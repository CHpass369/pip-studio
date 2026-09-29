import React, { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Checkbox, FormControlLabel } from '@mui/material';

import api from 'administrator/api/globals/v3';
import { toast } from 'generics/services/v4';
import { BUTTON_LABELS, RemoveDialog } from 'components/generics/v2';
import { ContentTitle } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import { useFormReducer } from 'generics/functions/forms/v2';
import { WButton, WTextField } from 'components/forms/v3';
import { UImage } from 'components/images/v3';
import { AREA_GROUPS_UPDATE_TITLE } from '../groups.constants';
import { Group } from 'administrator/models/group.model';

const AreaGroupUpdate = () => {
  const { group_id } = useParams();
  const navigate = useNavigate();
  const {
    item,
    set_item,
    on_string_change,
    on_checkbox_change,
  } = useFormReducer<Partial<Group>>({});

  const on_submit = () => {
    api.groups.update(item._id as string, item)
    .then(() => {
      navigate('/configuration/groups');
    })
    .catch(toast.api_danger);
  };

  const handle_image = useCallback((data: Partial<Group>) => {
    set_item((prev) => ({ ...prev, ...data }));
  }, [set_item]);

  const on_remove_callback = useCallback(() => {
    api.groups.remove(item._id as string)
    .then(() => {
      navigate('/configuration/groups');
    })
    .catch(toast.api_danger);
  }, [navigate, item]);

  useEffect(() => {
    api.groups.get_by_id(group_id as string)
    .then(({ data }) => {
      set_item(data);
    })
    .catch(toast.api_danger);
  }, [group_id, set_item]);

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={AREA_GROUPS_UPDATE_TITLE} />
      <Flex.Item>
        <Flex.Content>
          <WTextField name="name" label="Nombre" value={item.name} onChange={on_string_change} />
          <WTextField multiline rows={4} name="description" label="Descripción" value={item.description} onChange={on_string_change} />
          <FormControlLabel
            control={<Checkbox name="enabled" checked={!!item.enabled} onChange={on_checkbox_change} />}
            label="Está habilitado"
          />
          <UImage image={item.image_id} height="150px" quality={1080} on_callback={handle_image} />
        </Flex.Content>
        <Flex.Buttoms>
          <RemoveDialog label={BUTTON_LABELS.REMOVE} on_click={on_remove_callback} />
          <WButton variant="contained" on_click={on_submit} label={BUTTON_LABELS.UPDATE} />
        </Flex.Buttoms>
      </Flex.Item>
    </Flex>
  );
};

export { AreaGroupUpdate };
