import storage from './storage.service';

const get_token = () => {
  const token = storage.load('token');
  return `Bearer ${token.session_id}`;
};

const header = () => {
  const token = storage.load('token');
  return {
    headers: {
      Authorization: token ? get_token() : null,
    },
  };
};

export default { header, get_token };
