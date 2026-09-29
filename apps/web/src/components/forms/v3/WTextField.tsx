import { TextField } from '@mui/material';
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';

interface WTextFieldProps {
  name?: string;
  label?: string;
  value?: string;
  size?: 'small' | 'medium';
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  multiline?: boolean;
  rows?: number;
}

const WTextField = (parameters: WTextFieldProps) => {
  if (!parameters) {
    throw new Error('parameters is undefined');
  }

  const { name, label, value = '', onChange, type = 'text', size = 'small', multiline = false, rows } = parameters;

  const [item, set_item] = useState('');

  const on_string_change = (event: ChangeEvent<HTMLInputElement>) => {
    set_item(event.target.value);
    onChange(event);
  };

  useEffect(() => {
    set_item(value);
  }, [value, set_item]);

  return (
    <TextField
      fullWidth
      type={type}
      name={name}
      label={label}
      value={item}
      size={size}
      onChange={on_string_change}
      multiline={multiline}
      rows={multiline ? (rows || 4) : undefined}
    />
  );
};

export { WTextField };
