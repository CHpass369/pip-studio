import React, { ReactNode, useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';

import { api, toast } from 'generics/services/v4';
import { dropdowm } from 'generics/functions/forms/v1';

interface MultiSelectOption {
  _id: string;
  value: string;
  label: string;
}

interface MultiSelectProps {
  selector: string;
  placeholder: string;
  path: string;
  params: Record<string, unknown>;
  _ids?: string[];
  on_select: (selected_ids: string[], created_ids: string[], removed_ids: string[]) => void;
  children: ReactNode;
}

const MultiSelect = ({ selector, placeholder, path, params, _ids = [], on_select, children }: MultiSelectProps) => {
  const [item, set_item] = useState<MultiSelectOption[]>([]);
  const [items, set_items] = useState<MultiSelectOption[]>([]);

  const on_group_change = (selected: MultiValue<MultiSelectOption>) => {
    const data = [...selected];
    const removed = item.filter((o) => !data.includes(o)).map((o) => o._id);
    const created = data.filter((o) => !item.includes(o)).map((o) => o._id);
    on_select(data.map((o) => o._id), created, removed);
    set_item(data);
  };

  useEffect(() => {
    api.get(path, null, params)
    .then(({ data }) => {
      const aux_items = dropdowm.get_options(data, selector);
      set_items(aux_items);
      const value_aux: MultiSelectOption[] = [];
      _ids.forEach((_id) => {
        const aux_item = aux_items.find((option: MultiSelectOption) => option.value === _id);
        if (aux_item) value_aux.push(aux_item);
      });
      set_item(value_aux);
    })
    .catch(toast.api_danger);
  }, [path, params, selector, _ids]);

  return (
    <div className="field">
      {children}
      <Select
        isMulti
        isClearable
        placeholder={placeholder}
        value={item}
        onChange={on_group_change}
        options={items}
        styles={dropdowm.select_color_config}
      />
    </div>
  );
};

export { MultiSelect };
