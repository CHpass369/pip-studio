import { GENERIC } from 'generics/constants';

export const ROUTE = {
  LIST: `${GENERIC.APP_BASE_URL}/workers`,
  NEW: 'new',
};

const CONTEXT = 'Trabajadores';
const TITLE = 'lista de trabajadores';
export const ITEM_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'area de creacion y edicion de trabajadores',
};
export const ITEMS_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'lista de trabajadores',
};
export const EMPTY_LIST_MESSAGE = 'No existe trabajadores registradas';
