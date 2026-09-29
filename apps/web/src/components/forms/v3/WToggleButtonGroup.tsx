import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { ReactNode } from 'react';

interface WToggleButtonGroupOption {
  value: string;
  icon: ReactNode;
}

interface WToggleButtonGroupProps {
  value: string;
  options: WToggleButtonGroupOption[];
  size?: 'small' | 'medium' | 'large';
  on_change: (value: string) => void;
}

const WToggleButtonGroup = (parameters: WToggleButtonGroupProps) => {
  if (!parameters) {
    throw new Error('parameters is undefined');
  }

  const { value, options, size = 'small', on_change } = parameters;

  const on_toggle_change = (_event: React.MouseEvent<HTMLElement>, new_value: string | null) => {
    if (!new_value) return;
    on_change(new_value);
  };

  return (
    <ToggleButtonGroup value={value} exclusive size={size} onChange={on_toggle_change}>
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {option.icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export { WToggleButtonGroup };
export type { WToggleButtonGroupOption };
