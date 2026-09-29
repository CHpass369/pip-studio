import { GENERIC } from 'generics/constants';

export const ROUTE = {
  LIST: `${GENERIC.APP_BASE_URL}/materials`,
  NEW: 'new',
};

const CONTEXT = 'Materiales';
const TITLE = 'lista de materiales';
export const ITEM_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'area de creacion y edicion de materiales',
};
export const ITEMS_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'lista de materiales',
};
export const EMPTY_LIST_MESSAGE = 'No existe materiales registradas';
