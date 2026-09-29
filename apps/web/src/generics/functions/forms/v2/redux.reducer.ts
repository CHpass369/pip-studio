import { useState } from 'react';

const useReduxReducer = (data, on_change) => {
  if (!data) {
    throw new Error('data is undefined');
  }
  if (!on_change) {
    throw new Error('on_change is undefined');
  }
  let item = { ...data };

  const is_number = (str) => {
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  const on_string_change = (event: any) => {
    event.stopPropagation();
    item = { ...item, [event.target.name]: event.target.value };
    on_change({ ...item });
  };

  const on_number_change = (event: any) => {
    event.stopPropagation();
    item = { ...item, [event.target.name]: parseInt(event.target.value, 10) };
    on_change({ ...item });
  };

  const on_float_change = (event: any) => {
    event.stopPropagation();
    item = { ...item, [event.target.name]: parseFloat(event.target.value) };
    if (is_number(event.target.value)) {
      on_change({ ...item });
    }
  };

  const on_checkbox_change = (event: any) => {
    item = { ...item, [event.target.name]: event.target.checked };
    on_change({ ...item  });
  };

  return {
    item,
    on_string_change,
    on_number_change,
    on_checkbox_change,
    on_float_change,
  };
};

export { useReduxReducer };
