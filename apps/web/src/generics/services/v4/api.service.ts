import axios from 'axios';
import { BASE_PATH } from 'generics/constants';

import auth from './auth.service';

const get_session = () => (axios.create(auth.header()));

const replacer = (template, o) => {
  if (o === null) {
    return template;
  }
  const keys = Object.keys(o);

  return keys.reduce(
    (str, key) => (str.replace(`{${key}}`, o[key])),
    template,
  );
};

const get = (path, query, params) => {
  if (!path) {
    throw new Error('path is undefined');
  }

  return get_session().get(`${BASE_PATH.APP}${replacer(path, query)}`, { params });
};

const post = (path, query, payload) => {
  if (!path) {
    throw new Error('path is undefined');
  }
  if (!payload) {
    throw new Error('payload is undefined');
  }

  return get_session().post(`${BASE_PATH.APP}${replacer(path, query)}`, payload);
};

const put = (path, query, payload) => {
  if (!path) {
    throw new Error('path is undefined');
  }
  if (!payload) {
    throw new Error('payload is undefined');
  }

  return get_session().put(`${BASE_PATH.APP}${replacer(path, query)}`, payload);
};

const remove = (path, query) => {
  if (!path) {
    throw new Error('path is undefined');
  }

  return get_session().delete(`${BASE_PATH.APP}${replacer(path, query)}`);
};

export default { get_session, get, post, put, remove };
