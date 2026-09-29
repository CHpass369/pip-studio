export const build_search = (query: any) => {
  if (!query) {
    throw new Error('query is undefined');
  }

  const search: any = {
    area_id: query.area_id,
  };
  if (query.search) {
    search.name = { $regex: query.search, $options: 'i' };
  }
  return search;
};
