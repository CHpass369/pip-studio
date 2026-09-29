const get_options = (items, value) => (
  items.map((item) => ({
    _id: item._id,
    value: item._id,
    label: item[value],
  }))
);

const select_color_config = {
  // eslint-disable-next-line
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isFocused ? '#111111' : null,
    color: '#777777',
  }),
};

export default { get_options, select_color_config };
