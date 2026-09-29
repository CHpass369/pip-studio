import React, { ChangeEvent, useEffect, useId, useState } from 'react';
import { AxiosProgressEvent } from 'axios';

import { files, toast } from 'generics/services/v4';
import { BASE_PATH } from 'generics/constants';
import { WTextField } from 'components/forms/v3';
import default_image from '../../../assets/images/hardcode/template.jpeg';

import './UImage.scss';

interface UImageProps {
  image?: string;
  width?: string;
  height?: string;
  on_callback: (data: { image_id: string }) => void;
}

const get_image_url = (image?: string) => (image ? `${BASE_PATH.FILES}/v1/assets/images/width/1080/${image}` : default_image);

const UImage = ({ image, width = 'auto', height = 'auto', on_callback }: UImageProps) => {
  const input_id = useId();
  const [preview, set_preview] = useState(() => get_image_url(image));
  const [progress, set_progress] = useState<number | null>(null);
  const style = { width, height };

  useEffect(() => {
    set_preview(get_image_url(image));
  }, [image]);

  useEffect(() => () => {
    if (preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
  }, [preview]);

  const on_image_select = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    event.target.value = '';

    if (!file) return;

    set_preview(URL.createObjectURL(file));
    set_progress(0);

    files.upload_images(file, (chunk: AxiosProgressEvent) => {
      set_progress(Math.round((100 * chunk.loaded) / (chunk.total || chunk.loaded)));
    })
    .then(({ data }) => {
      on_callback({ image_id: data._id });
    })
    .catch((error) => {
      set_preview(get_image_url(image));
      toast.api_danger(error);
    })
    .finally(() => {
      set_progress(null);
    });
  };

  const on_image_id_change = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    set_preview(get_image_url(value));
    on_callback({ image_id: value });
  };

  return (
    <div className="h-image-compoment">
      <label htmlFor={input_id}>Seleccione una imagen</label>
      <label htmlFor={input_id} className="image" style={style}>
        <img alt="" src={preview} onError={() => set_preview(default_image)} />
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
      <input id={input_id} className="image-input" type="file" name="avatar" accept="image/*" onChange={on_image_select} disabled={progress !== null} />
      <WTextField name="image_id" label="Image ID" value={image} onChange={on_image_id_change} />
    </div>
  );
};

export { UImage };
