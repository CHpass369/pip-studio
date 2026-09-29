import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Checkbox, FormControlLabel } from '@mui/material';

import actions from 'store/actions/globals/v3';
import setting_actions from 'store/actions/settings';
import api from 'administrator/api/globals/v3';
import { toast } from 'generics/services/v4';
import { ContentTitle } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import { useFormReducer } from 'generics/functions/forms/v2';
import { WTextField } from 'components/forms/v3';
import { UImage } from 'components/images/v3';
import { Group } from 'administrator/models/group.model';

interface GroupCreateModalProps {
  open: boolean;
  set_open: (open: boolean) => void;
}

const HEADER = {
  context: 'Organización',
  title: 'Crear organización',
};

const get_initial_item = (account_id: string): Partial<Group> => ({
  account_id,
  name: '',
  description: '',
  image_id: null,
  enabled: false,
});

const GroupCreateModal = ({ open, set_open }: GroupCreateModalProps) => {
  const { account } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const {
    item, set_item, on_string_change, on_checkbox_change, on_image_change,
  } = useFormReducer<Partial<Group>>(get_initial_item(account._id));

  const on_close = () => set_open(false);

  const on_submit = () => {
    api.groups.create(item)
    .then(({ data: group }) => {
      dispatch(setting_actions.groups.set_one(group));
      return api.areas.find({});
    })
    .then(({ data }) => {
      dispatch(actions.apps.set_area(data[0]));
      dispatch(actions.areas.set(data));
      set_item(get_initial_item(account._id));
      set_open(false);
    })
    .catch(toast.api_danger);
  };

  return (
    <Modal open={open} onClose={on_close}>
      <Flex class_name="dialog-generic-flex text-separator">
        <ContentTitle config={HEADER} />
        <Flex.Content>
          <WTextField name="name" label="Nombre" value={item.name} onChange={on_string_change} />
          <WTextField multiline rows={4} name="description" label="Descripción" value={item.description} onChange={on_string_change} />
          <FormControlLabel
            control={<Checkbox name="enabled" checked={!!item.enabled} onChange={on_checkbox_change} />}
            label="Está habilitado"
          />
          <UImage image={item.image_id ?? undefined} height="150px" on_callback={on_image_change} />
        </Flex.Content>
        <Flex.Buttoms>
          <Button variant="outlined" onClick={on_close}>Cancelar</Button>
          <Button variant="contained" onClick={on_submit} disabled={!item.name}>Crear organización</Button>
        </Flex.Buttoms>
      </Flex>
    </Modal>
  );
};

export { GroupCreateModal };
