import { TextField } from '@mui/material';
import React, { ChangeEvent, ChangeEventHandler, FocusEventHandler, useEffect, useState } from 'react';

interface WNumberFieldProps {
  name?: string;
  label?: string;
  value?: number | string;
  size?: 'small' | 'medium';
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

const WNumberField = (parameters: WNumberFieldProps) => {
  if (!parameters) {
    throw new Error('parameters is undefined');
  }

  const { name, label, value = 0, size = 'small', onChange, onBlur, disabled = false } = parameters;

  const [item, set_item] = useState('');

  const on_string_change = (event: ChangeEvent<HTMLInputElement>) => {
    const str = event.target.value;
    set_item(event.target.value);
    if (!isNaN(Number(str)) && !isNaN(parseFloat(str))) {
      onChange(event);
    }
  };

  useEffect(() => {
    set_item(String(value));
  }, [value, set_item]);

  return (
    <TextField type="number" name={name} label={label} value={item} size={size} onChange={on_string_change} onBlur={onBlur} disabled={disabled} />
  );
};

export { WNumberField };
