import { on_started, on_stopped } from 'store/slices/global/loading.slice';
import { store } from 'store/index.store';

const resolve = () => (Promise.resolve());
const start = <T>(data: T) => {
  store.dispatch(on_started());
  return data;
};

const stop = <T>(data: T) => {
  store.dispatch(on_stopped());
  return data;
};

const error = (err: unknown) => {
  store.dispatch(on_stopped());
  throw err;
};

export default { resolve, start, stop, error };
