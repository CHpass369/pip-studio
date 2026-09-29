import React from 'react';
import { Flex } from 'components/grids/v5';
import { Button, Modal } from '@mui/material';

import { ContentTitle } from 'components/titles/v3';
import { BUTTON_LABELS } from 'components/generics/v2';

const ConfirmationDialog = ({ open, title, message, on_confirm, on_cancel }) => {
  if (!on_confirm) {
    throw new Error('on_confirm is undefined');
  }
  if (!on_cancel) {
    throw new Error('on_cancel is undefined');
  }

  const header = {
    context: 'Confirmación',
    title: title || 'Confirmar acción',
  };

  return (
    <Modal open={open} onClose={on_cancel}>
      <Flex class_name="dialog-generic-flex text-separator">
        <ContentTitle config={header} />
        <Flex.Scrap>
          {message || '¿Estas seguro?'}
        </Flex.Scrap>
        <Flex.Buttoms>
          <Button variant="outlined" onClick={on_cancel}>{BUTTON_LABELS.CANCEL}</Button>
          <Button variant="contained" onClick={on_confirm}>{BUTTON_LABELS.ACCEPT}</Button>
        </Flex.Buttoms>
      </Flex>
    </Modal>
  );
};

export { ConfirmationDialog };
