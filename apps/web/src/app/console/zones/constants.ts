import { GENERIC } from 'generics/constants';

export const ROUTE = {
  LIST: `${GENERIC.APP_BASE_URL}/zones`,
  NEW: 'new',
};

const CONTEXT = 'Zonas';
const TITLE = 'lista de zonas';
export const ITEM_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'area de creacion y edicion de zonas',
};
export const ITEMS_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'lista de zonas',
};
export const EMPTY_LIST_MESSAGE = 'No existe zonas registradas';
