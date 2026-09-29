import auth from './auth.service';
import storage from './storage.service';

const get_headers = (): HeadersInit => {
  const token = storage.load('token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = auth.get_token();
  }

  return headers;
};

const parse_response = async <T = any>(response: Response): Promise<{ data: T }> => {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error: any = new Error(response.statusText);
    error.response = { status: response.status, data };
    throw error;
  }

  return { data };
};

const get_by_id = <T = any>(PATH: string) => (
  (_id: string): Promise<{ data: T }> => {
    if (!_id) {
      throw new Error('_id is undefined');
    }

    return fetch(`${PATH}/${_id}`, { headers: get_headers() })
    .then((response) => parse_response<T>(response));
  }
);

const find = <T = any>(PATH: string) => (
  (params: Record<string, any>): Promise<{ data: T[] }> => {
    if (!params) {
      throw new Error('params is undefined');
    }

    const query = new URLSearchParams(params).toString();
    const url = query ? `${PATH}?${query}` : PATH;

    return fetch(url, { headers: get_headers() })
    .then((response) => parse_response<T[]>(response));
  }
);

const find_by = <T = any>(PATH: string) => (
  (pagination: { page: number; limit: number }, params: Record<string, any>): Promise<{ data: T[] }> => {
    if (!pagination) {
      throw new Error('pagination is undefined');
    }
    if (!params) {
      throw new Error('params is undefined');
    }

    const query = new URLSearchParams(params).toString();
    const url = `${PATH}/page/${pagination.page}/limit/${pagination.limit}${query ? `?${query}` : ''}`;

    return fetch(url, { headers: get_headers() })
    .then((response) => parse_response<T[]>(response));
  }
);

const create = <T = any>(PATH: string) => (
  (params: Partial<T>): Promise<{ data: T }> => {
    if (!params) {
      throw new Error('params is undefined');
    }

    return fetch(PATH, {
      method: 'POST',
      headers: get_headers(),
      body: JSON.stringify(params),
    })
    .then((response) => parse_response<T>(response));
  }
);

const update = <T = any>(PATH: string) => (
  (_id: string, params: Partial<T>): Promise<{ data: T }> => {
    if (!_id) {
      throw new Error('_id is undefined');
    }
    if (!params) {
      throw new Error('params is undefined');
    }

    return fetch(`${PATH}/${_id}`, {
      method: 'PUT',
      headers: get_headers(),
      body: JSON.stringify(params),
    })
    .then((response) => parse_response<T>(response));
  }
);

const remove = <T = any>(PATH: string) => (
  (_id: string): Promise<{ data: T }> => {
    if (!_id) {
      throw new Error('_id is undefined');
    }

    return fetch(`${PATH}/${_id}`, {
      method: 'DELETE',
      headers: get_headers(),
    })
    .then((response) => parse_response<T>(response));
  }
);

export default { get_headers, get_by_id, find, find_by, create, update, remove };
