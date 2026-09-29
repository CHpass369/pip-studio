import axios from 'axios';

import { BASE_PATH } from 'generics/constants';
import auth from './auth.service';

const getFileFromBase64 = (string64, fileName) => {
  const trimmedString = string64.replace('data:image/jpeg;base64,', '');
  const imageContent = atob(trimmedString);
  const buffer = new ArrayBuffer(imageContent.length);
  const view = new Uint8Array(buffer);

  for (let n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }
  const type = 'image/jpeg';
  const blob = new Blob([buffer], { type });
  return new File([blob], fileName, { lastModified: new Date().getTime(), type });
};

const upload_string_images = (string64, on_upload_progress) => {
  const file = getFileFromBase64(string64, 'generator.jpeg');

  const data = new FormData();
  data.append('avatar', file);

  return axios.create(auth.header()).post(`${BASE_PATH.FILES}/v1/assets/images`, data, {
    on_upload_progress,
  });
};

const upload_images = (file, on_upload_progress) => {
  const data = new FormData();
  data.append('avatar', file);

  return axios.create(auth.header()).post(`${BASE_PATH.FILES}/v1/assets/images`, data, {
    on_upload_progress,
  });
};

export default { upload_string_images, upload_images };
