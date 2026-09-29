import { TextField } from '@mui/material';
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';

interface WDateFieldProps {
  name?: string;
  label?: string;
  value?: string;
  size?: 'small' | 'medium';
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

const WDateField = (parameters: WDateFieldProps) => {
  if (!parameters) {
    throw new Error('parameters is undefined');
  }

  const { name, label, value = '', size = 'small', onChange, disabled = false } = parameters;

  const [item, set_item] = useState('');

  const on_date_change = (event: ChangeEvent<HTMLInputElement>) => {
    set_item(event.target.value);
    onChange(event);
  };

  useEffect(() => {
    set_item(value);
  }, [value]);

  return (
    <TextField
      type="date"
      name={name}
      label={label}
      value={item}
      size={size}
      onChange={on_date_change}
      disabled={disabled}
      slotProps={{ inputLabel: { shrink: true } }}
    />
  );
};

export { WDateField };
