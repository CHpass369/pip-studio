const getOptions = (items, value) => (
  items.map((item) => ({
    key: item._id,
    value: item._id,
    text: item[value],
  }))
);

export { getOptions };
