
const is_number = (str) => {
  if (!str) {
    throw new Error('str is undefined');
  }
  return !isNaN(str) && !isNaN(parseFloat(str));
}

export { is_number };
