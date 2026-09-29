import { GENERIC } from 'generics/constants';

export const ROUTE = {
  LIST: `${GENERIC.APP_BASE_URL}/tools`,
  NEW: 'new',
};

const CONTEXT = 'Herramientas';
const TITLE = 'lista de herramientas';
export const ITEM_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'area de creacion y edicion de herramientas',
};
export const ITEMS_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'lista de herramientas',
};
export const EMPTY_LIST_MESSAGE = 'No existe herramientas registradas';
