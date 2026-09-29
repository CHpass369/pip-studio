import { GENERIC } from 'generics/constants';

export const ROUTE = {
  LIST: `${GENERIC.APP_BASE_URL}/parameters`,
  NEW: 'new',
};

const CONTEXT = 'Parámetros';
const TITLE = 'Parámetros de cálculo';
export const ITEM_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'Área de creación y edición de parámetros de cálculo',
};
export const ITEMS_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'Lista de parámetros de cálculo',
};
export const EMPTY_LIST_MESSAGE = 'No existen parámetros registrados';
