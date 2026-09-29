const reducer = (state, event) => ({
  ...state,
  [event.name]: event.value,
});

const set_item = (data, on_callback) => {
  Object.keys(data).forEach((key) => {
    on_callback({
      name: key,
      value: data[key],
    });
  });
};

export default { reducer, set_item };
