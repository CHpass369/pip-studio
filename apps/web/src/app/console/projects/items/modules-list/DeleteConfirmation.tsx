import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface DeleteConfirmationProps {
  open: boolean;
  on_close: () => void;
  on_confirm: () => void;
  name: string;
}

const DeleteConfirmation = ({ open, on_close, on_confirm, name }: DeleteConfirmationProps) => {
  if (!on_close) {
    throw new Error('on_close is undefined');
  }
  if (!on_confirm) {
    throw new Error('on_confirm is undefined');
  }

  const handle_confirm = (e: any) => {
    e.stopPropagation();
    on_confirm();
    on_close();
  };

  return (
    <Dialog open={open} onClose={on_close} maxWidth="xs" fullWidth onClick={(e) => e.stopPropagation()}>
      <DialogTitle>Confirmar eliminación</DialogTitle>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        {name ? `¿Estas seguro que quieres eliminar "${name}"?` : '¿Estas seguro que quieres eliminar este módulo?'}
      </DialogContent>
      <DialogActions onClick={(e) => e.stopPropagation()}>
        <Button onClick={(e) => { e.stopPropagation(); on_close(); }}>Cancelar</Button>
        <Button variant="contained" color="error" onClick={handle_confirm}>Eliminar</Button>
      </DialogActions>
    </Dialog>
  );
};

export { DeleteConfirmation };
