import axios, { AxiosPromise } from 'axios';

import auth from './auth.service';

const get_session = () => (axios.create(auth.header()));

const get_by_id = <T = any>(PATH: string) => (
  (_id: string): AxiosPromise<T> => {
    if (!_id) {
      throw new Error('_id is undefined');
    }

    return get_session().get(`${PATH}/${_id}`);
  }
);

const find = <T = any>(PATH: string) => (
  (params: Record<string, any>): AxiosPromise<T[]> => {
    if (!params) {
      throw new Error('params is undefined');
    }

    return get_session().get(PATH, { params });
  }
);

const find_by = <T = any>(PATH: string) => (
  (pagination: { page: number; limit: number }, params: Record<string, any>): AxiosPromise<T[]> => {
    if (!pagination) {
      throw new Error('pagination is undefined');
    }
    if (!params) {
      throw new Error('params is undefined');
    }

    return get_session().get(`${PATH}/page/${pagination.page}/limit/${pagination.limit}`, { params });
  }
);

const create = <T = any>(PATH: string) => (
  (params: Partial<T>): AxiosPromise<T> => {
    if (!params) {
      throw new Error('params is undefined');
    }

    return get_session().post(PATH, params);
  }
);

const update = <T = any>(PATH: string) => (
  (_id: string, params: Partial<T>): AxiosPromise<T> => {
    if (!_id) {
      throw new Error('_id is undefined');
    }
    if (!params) {
      throw new Error('params is undefined');
    }

    return get_session().put(`${PATH}/${_id}`, params);
  }
);

const remove = <T = any>(PATH: string) => (
  (_id: string): AxiosPromise<T> => {
    if (!_id) {
      throw new Error('_id is undefined');
    }

    return get_session().delete(`${PATH}/${_id}`);
  }
);

export default { get_session, get_by_id, find, find_by, create, update, remove };
