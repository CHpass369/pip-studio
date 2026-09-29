import { Button } from '@mui/material';
import React, { MouseEventHandler, ReactNode } from 'react';

interface WButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  on_click?: MouseEventHandler<HTMLButtonElement>;
  label?: ReactNode;
  disabled?: boolean;
}

const WButton = (parameters: WButtonProps) => {
  if (!parameters) {
    throw new Error('parameters is undefined');
  }

  const { variant = 'contained', type = 'button', size = 'small', on_click, label, disabled = false } = parameters;

  return (
    <Button variant={variant} type={type} size={size} onClick={on_click} disabled={disabled}>
      {label}
    </Button>
  );
};

export { WButton };
