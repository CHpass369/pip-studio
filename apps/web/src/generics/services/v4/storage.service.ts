const validate_key = (key) => {
  if (!key) {
    throw new Error('key is undefined');
  }
}

const save = (key, value, state?) => {
  validate_key(key);
  if (value === undefined) {
    throw new Error('value is undefined');
  }
  if (state) {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

const load = (key, state?) => {
  validate_key(key);
  if (state) {
    return localStorage.getItem(key);
  }
  return JSON.parse(localStorage.getItem(key));
}

const remove = (key) => {
  validate_key(key);
  localStorage.removeItem(key);
}

export default { save, load, remove };
