import React from 'react';

import { Button, Icon, Modal } from 'semantic-ui-react';

const RemoveModal = ({ open, setOpen, onHandle }) => {
  
  const handleCancel = (e: any) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.stopPropagation();
    setOpen(false);
    onHandle();
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Content>
        ¿Estas seguro que quieres eliminar?
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={(e: any) => {handleCancel(e)}}>
          <Icon name='remove' />
          Cancelar
        </Button>
        <Button onClick={(e: any) => {handleSubmit(e)}}>
          <Icon name='checkmark'/>
          Eliminar
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export { RemoveModal };
