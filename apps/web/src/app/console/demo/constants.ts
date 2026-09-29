import { GENERIC } from 'generics/constants';

export const ROUTE = {
  LIST: `${GENERIC.APP_BASE_URL}/stores`,
  NEW: 'new',
};

const CONTEXT = 'Ventas';
const TITLE = 'lista de almacenes';
export const ITEM_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'area de creacion y edicion de almacenes',
};
export const ITEMS_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'lista de almacenes',
};
export const EMPTY_LIST_MESSAGE = 'No existe almacenes registradas';
