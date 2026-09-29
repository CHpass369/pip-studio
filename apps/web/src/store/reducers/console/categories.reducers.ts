import { types } from 'store/actions/console/categories.actions';

interface CategoriesState {
  categories: any[];
}

interface CategoriesAction {
  type: string;
  data: any;
}

const initial_state: CategoriesState = {
  categories: [],
};

const reducer = (state = initial_state, { type, data }: CategoriesAction) => {
  switch (type) {
  case types.CATEGORIES_SET: {
    return { ...state, categories: [...data] };
  }
  case types.CATEGORIES_SET_ONE: {
    return { ...state, categories: [data, ...state.categories] };
  }
  case types.CATEGORIES_UPDATE: {
    const categories = state.categories.map((item) => (item._id === data._id ? { ...data } : item));
    return { ...state, categories };
  }
  case types.CATEGORIES_REMOVE: {
    const categories = state.categories.filter((item) => item._id !== data._id);
    return { ...state, categories };
  }
  default:
    return state;
  }
};

export default reducer;
