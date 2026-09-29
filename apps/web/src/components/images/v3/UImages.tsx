import React, { ChangeEvent, useEffect, useId, useState } from 'react';
import { AxiosProgressEvent } from 'axios';

import { files, toast } from 'generics/services/v4';
import { BASE_PATH } from 'generics/constants';
import default_image from '../../../assets/images/hardcode/template.jpeg';

import './UImages.scss';

const DIRECTION = {
  H: 'width',
  V: 'height',
};

interface UImagesProps {
  ids?: string[];
  width?: string;
  height?: string;
  direction?: string;
  on_callback: (ids: string[]) => void;
}

const get_image_url = (id: string, direction: string) => `${BASE_PATH.FILES}/v1/assets/images/${direction}/1080/${id}`;

const UImages = ({ ids = [], width = 'auto', height = 'auto', direction = DIRECTION.H, on_callback }: UImagesProps) => {
  const input_id = useId();
  const [items, set_items] = useState<string[]>(ids);
  const [progress, set_progress] = useState<number | null>(null);
  const style = { width, height };

  useEffect(() => {
    set_items(ids);
  }, [ids]);

  const on_remove = (id: string) => {
    const tmp_ids = items.filter((item) => item !== id);

    set_items(tmp_ids);
    on_callback(tmp_ids);
  };

  const on_image_select = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    event.target.value = '';

    if (!file) return;

    set_progress(0);

    files.upload_images(file, (chunk: AxiosProgressEvent) => {
      set_progress(Math.round((100 * chunk.loaded) / (chunk.total || chunk.loaded)));
    })
    .then(({ data }) => {
      const tmp_ids = [...items, data._id];

      set_items(tmp_ids);
      on_callback(tmp_ids);
    })
    .catch(toast.api_danger)
    .finally(() => {
      set_progress(null);
    });
  };

  return (
    <div className="h-image-compoment">
      <label htmlFor={input_id}>Seleccione varias imagenes</label>
      <div className="images-list">
        {
          items.map((item) => (
            <button key={item} type="button" className="image" style={style} onClick={() => on_remove(item)}>
              <img alt="" src={get_image_url(item, direction)} />
              <div className="image-overlay image-overlay--hint">
                Click aquí para eliminar
              </div>
            </button>
          ))
        }
        <label htmlFor={input_id} className="image" style={style}>
          <img alt="" src={default_image} />
          {
            progress !== null ? (
              <div className="image-overlay">
                {`${progress}%`}
              </div>
            ) : (
              <div className="image-overlay image-overlay--hint">
                Click aquí para subir una imagen
              </div>
            )
          }
        </label>
      </div>
      <input id={input_id} className="image-input" type="file" name="avatar" accept="image/*" onChange={on_image_select} disabled={progress !== null} />
    </div>
  );
};

UImages.H = DIRECTION.H;
UImages.V = DIRECTION.V;

export { UImages };
