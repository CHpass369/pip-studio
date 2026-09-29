import io from 'socket.io-client';

import { BASE_PATH } from 'generics/constants';
import auth from './auth.service';

let client = null;

const start = () => {
  client = io(`${BASE_PATH.SOCKET}`, {
    auth: {
      token: auth.get_token(),
    },
  });
};

const on = (channel, callback) => {
  if (!channel) {
    throw new Error('channel is undefined');
  }
  if (!callback) {
    throw new Error('callback is undefined');
  }
  client.on(channel, callback);
};

const emit = (channel, data) => {
  if (!channel) {
    throw new Error('channel is undefined');
  }
  if (!data) {
    throw new Error('data is undefined');
  }
  client.emit(channel, data);
};

const remove = (channel, data) => {
  if (!channel) {
    throw new Error('channel is undefined');
  }
  if (!data) {
    throw new Error('data is undefined');
  }
  client.removeListener(channel, data);
};

export default { start, on, emit, remove };
