import { GENERIC } from 'generics/constants';

export const ROUTE = {
  LIST: `${GENERIC.APP_BASE_URL}/measures`,
  NEW: 'new',
};

const CONTEXT = 'Sistema de medidas';
const TITLE = 'lista de medidas';
export const ITEM_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'area de creacion y edicion de medidas',
};
export const ITEMS_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'lista de medidas',
};
export const EMPTY_LIST_MESSAGE = 'No existe medidas registradas';