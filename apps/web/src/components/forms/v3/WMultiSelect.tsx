import React from 'react';
import { Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent, InputLabel, FormControl } from '@mui/material';

interface WMultiSelectOption {
  value: string;
  label: string;
}

interface WMultiSelectProps {
  name?: string;
  label: string;
  value: string[];
  options: WMultiSelectOption[];
  size?: 'small' | 'medium';
  on_change: (value: string[]) => void;
}

const WMultiSelect = (parameters: WMultiSelectProps) => {
  if (!parameters) {
    throw new Error('parameters is undefined');
  }

  const { name, label, value, options, size = 'small', on_change } = parameters;

  const on_select_change = (event: SelectChangeEvent<string[]>) => {
    const { target: { value: selected } } = event;
    on_change(typeof selected === 'string' ? selected.split(',') : selected);
  };

  const get_label = (option_value: string) => options.find((option) => option.value === option_value)?.label || option_value;

  return (
    <FormControl fullWidth size={size}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        name={name}
        value={value}
        size={size}
        onChange={on_select_change}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {selected.map((selected_value) => (
              <Chip key={selected_value} label={get_label(selected_value)} size="small" />
            ))}
          </div>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { WMultiSelect };
export type { WMultiSelectOption };
