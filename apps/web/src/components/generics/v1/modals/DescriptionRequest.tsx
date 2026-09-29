import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { Form, Modal } from 'semantic-ui-react';

import { useFormReducer } from 'generics/functions/forms/v2';
import { IButton } from 'components/buttons/v2';

const DescriptionRequest = ({ label, on_click }) => {
  const [open, set_open] = useState(false);
  const [form, setFrom] = useState(null);
  const {
    item,
    on_string_change,
  } = useFormReducer({
    descrition: 'La habitacion nesecita limpieza',
  });

  const handle_submit = () => {
    on_click(item);
  };

  return (
    <>
      <Modal
        onClose={() => set_open(false)}
        onOpen={() => set_open(true)}
        open={open}
        size="small"
      >
        <Modal.Header>Añadir descripción</Modal.Header>
        <Modal.Content>
          <Form onSubmit={(e: any) => handle_submit(e)} ref={(ref) => setFrom(ref)}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Correo electronico</label>
                <input name="email" value={item.email} placeholder="Correo electronico" onChange={on_string_change} />
              </Form.Field>
              <Form.Field>
                <label>Numero de contacto</label>
                <input name="cel" value={item.cel} placeholder="Numero de contacto" onChange={on_string_change} />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <IButton label="Cancel" icon="delete" on_click={() => set_open(false)} />
          <IButton label="Eliminar" icon="checkmark" color="red" on_click={() => form.handleSubmit()} />
        </Modal.Actions>
      </Modal>
      <IButton label={label} color="red" icon="delete" on_click={() => set_open(true)} />
    </>
  );
};

DescriptionRequest.propTypes = {
  label: PropTypes.string.isRequired,
  on_click: PropTypes.func.isRequired,
};

export { DescriptionRequest };
