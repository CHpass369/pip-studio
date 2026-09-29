import { useState } from 'react';

const useStringReducer = (data) => {
  if (!data) {
    throw new Error('data is indefined');
  }

  const [item, set_item] = useState(data);

  const on_string_change = (e: any) => {
    e.stopPropagation();
    set_item(e.target.value);
  };

  return {
    item,
    set_item,
    on_string_change,
  };
};

export { useStringReducer };
