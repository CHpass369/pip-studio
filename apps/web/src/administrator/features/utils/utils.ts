const formReducer = (state, event) => ({
  ...state,
  [event.name]: event.value,
});

export { formReducer };
