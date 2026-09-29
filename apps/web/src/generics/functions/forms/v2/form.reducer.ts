import { useState } from 'react';

const useFormReducer = <T = any>(data: T) => {
  if (!data) {
    throw new Error('data is indefined');
  }

  const [item, set_item] = useState<T>(data);

  const on_string_change = (event: any) => {
    event.stopPropagation();
    set_item({ ...item, [event.target.name]: event.target.value });
  };

  const on_number_change = (event: any) => {
    event.stopPropagation();
    set_item({ ...item, [event.target.name]: parseInt(event.target.value, 10) });
  };

  const on_float_change = (event: any) => {
    event.stopPropagation();
    set_item({ ...item, [event.target.name]: parseFloat(event.target.value) });
  };
  
  const on_image_change = (data: any) => {
    set_item({ ...item, ...data });
  };

  const on_uimage_change = (event: any) => {
    event.stopPropagation();
    set_item({ ...item, ...event });
  };

  const on_images_change = (ids: string[]) => {
    set_item({ ...item, image_ids: ids });
  };

  const on_checkbox_change = (event: any) => {
    event.stopPropagation();

    set_item({ ...item, [event.target.name]: event.target.checked });
  };

  return {
    item,
    set_item,
    on_string_change,
    on_number_change,
    on_image_change,
    on_uimage_change,
    on_images_change,
    on_checkbox_change,
    on_float_change,
  };
};

export { useFormReducer };
