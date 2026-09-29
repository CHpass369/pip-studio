import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { Modal } from 'semantic-ui-react';

import { IButton } from 'components/buttons/v2';

const RemoveConfirmation = ({ label, on_click }) => {
  const [open, set_open] = useState(false);

  return (
    <>
      <Modal
        onClose={() => set_open(false)}
        onOpen={() => set_open(true)}
        open={open}
        size="small"
      >
        <Modal.Header>Confirmar eliminación</Modal.Header>
        <Modal.Content>
          ¿Estas seguro que quieres eliminar?
        </Modal.Content>
        <Modal.Actions>
          <IButton label="Cancel" icon="delete" on_click={() => set_open(false)} />
          <IButton label="Eliminar" icon="checkmark" color="red" on_click={on_click} />
        </Modal.Actions>
      </Modal>
      <IButton label={label} color="red" icon="delete" on_click={() => set_open(true)} />
    </>
  );
};

RemoveConfirmation.propTypes = {
  label: PropTypes.string.isRequired,
  on_click: PropTypes.func.isRequired,
};

export { RemoveConfirmation };
