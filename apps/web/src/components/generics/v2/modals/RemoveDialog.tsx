import React, { MouseEventHandler, useState } from 'react';
import { Flex } from 'components/grids/v5';
import { Button, Modal } from '@mui/material';

import { ContentTitle } from 'components/titles/v3';
import { BUTTON_LABELS } from 'components/generics/v2';

interface RemoveDialogProps {
  on_click: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  label?: string;
  message?: string;
}

export const ITEM_HEADER = {
  context: 'Eliminación',
  title: 'Confirmar eliminación',
};

const RemoveDialog = ({ on_click, disabled, label = BUTTON_LABELS.REMOVE, message }: RemoveDialogProps) => {
  const [open, set_open] = useState(false);

  return (
    <>
      <Button variant="outlined" onClick={() => set_open(true)} disabled={disabled}>{label}</Button>
      <Modal open={open} onClose={() => set_open(false)}>
        <Flex class_name="dialog-generic-flex text-separator">
          <ContentTitle config={ITEM_HEADER} />
          <Flex.Scrap>
            {message || '¿Estas seguro que quieres eliminar?'}
          </Flex.Scrap>
          <Flex.Buttoms>
            <Button variant="outlined" onClick={() => set_open(false)}>{BUTTON_LABELS.CANCEL}</Button>
            <Button variant="contained" onClick={on_click}>{BUTTON_LABELS.DELETE}</Button>
          </Flex.Buttoms>
        </Flex>
      </Modal>
    </>
  );
};

export { RemoveDialog };
