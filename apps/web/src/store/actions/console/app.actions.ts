export const types = {
  STORE_SEARCH: 'store-search',
  STORE_STORE: 'store-store',
};

const set_store_search = (data: string) => ({
  type: types.STORE_SEARCH,
  data,
});

const set_store_store = (data: any) => ({
  type: types.STORE_STORE,
  data,
});

export default { set_store_search, set_store_store };
