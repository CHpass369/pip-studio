import { GENERIC } from 'generics/constants';

export const ROUTE = {
  LIST: `${GENERIC.APP_BASE_URL}/constructions`,
  NEW: 'new',
};

const CONTEXT = 'Construcciones';
const TITLE = 'lista de items';
export const ITEM_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'area de creacion y edicion de items',
};
export const ITEMS_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'lista de items',
};
export const EMPTY_LIST_MESSAGE = 'No existe items registradas';
