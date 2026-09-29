import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { Form } from 'semantic-ui-react';
// import Select from 'react-select';

import { api, toast } from 'generics/services/v4';
import { dropdowm } from 'generics/functions/forms/v1';

const MultiSelect = ({ selector, placeholder, path, params, value, on_select, children }) => {
  const [item, set_item] = useState([]);
  const [items, set_items] = useState([]);

  const on_group_change = (data) => {
    const removed = item.filter((o) => !data.includes(o));
    const created = data.filter((o) => !item.includes(o));
    on_select(created, removed);
    set_item(data);
  };

  useEffect(() => {
    api.get(path, null, params)
    .then(({ data }) => {
      const aux_items = dropdowm.get_options(data, selector);
      set_items(aux_items);
      const value_aux = [];
      value.forEach((sub_value) => {
        value_aux.push(aux_items.find((aux_item) => aux_item.value === sub_value.value));
      });
      set_item(value_aux);
    })
    .catch(toast.api_danger);
  }, [path, params, selector, value]);

  return (
    <Form.Field>
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
    </Form.Field>
  );
};

MultiSelect.propTypes = {
  selector: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  params: PropTypes.shape(PropTypes.any).isRequired,
  value: PropTypes.arrayOf(PropTypes.any).isRequired,
  on_select: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

export { MultiSelect };
