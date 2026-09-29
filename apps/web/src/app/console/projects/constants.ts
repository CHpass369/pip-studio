import { GENERIC } from 'generics/constants';

export const ROUTE = {
  LIST: `${GENERIC.APP_BASE_URL}/projects`,
  NEW: 'new',
};

const CONTEXT = 'Projectos';
const TITLE = 'lista de projectos';
export const ITEM_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'area de creacion y edicion de projectos',
};
export const ITEMS_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'lista de projectos',
};
export const ITEMS_MAP_HEADER = {
  context: CONTEXT,
  title: 'mapa de projectos',
  description: 'geolocalización de projectos',
};
export const EMPTY_LIST_MESSAGE = 'No existe projectos registradas';

export const AMERICAN_CURRENCIES = [
  { key: 'USD', label: '$us', name: 'Dólar estadounidense' },
  { key: 'EUR', label: '€', name: 'Euro' },
  { key: 'CAD', label: 'CA$', name: 'Dólar canadiense' },
  { key: 'MXN', label: 'MX$', name: 'Peso mexicano' },
  { key: 'BOB', label: 'Bs', name: 'Bolivianos' },
  { key: 'BRL', label: 'R$', name: 'Real brasileño' },
  { key: 'ARS', label: 'AR$', name: 'Peso argentino' },
  { key: 'CLP', label: 'CL$', name: 'Peso chileno' },
  { key: 'COP', label: 'CO$', name: 'Peso colombiano' },
  { key: 'PEN', label: 'S/', name: 'Sol peruano' },
  { key: 'UYU', label: '$U', name: 'Peso uruguayo' },
  { key: 'PYG', label: '₲', name: 'Guaraní paraguayo' },
  { key: 'VES', label: 'Bs.S', name: 'Bolívar venezolano' },
  { key: 'GTQ', label: 'Q', name: 'Quetzal guatemalteco' },
  { key: 'HNL', label: 'L', name: 'Lempira hondureño' },
  { key: 'NIO', label: 'C$', name: 'Córdoba nicaragüense' },
  { key: 'CRC', label: '₡', name: 'Colón costarricense' },
  { key: 'PAB', label: 'B/.', name: 'Balboa panameño' },
  { key: 'DOP', label: 'RD$', name: 'Peso dominicano' },
  { key: 'HTG', label: 'G', name: 'Gourde haitiano' },
  { key: 'CUP', label: '$', name: 'Peso cubano' },
  { key: 'JMD', label: 'J$', name: 'Dólar jamaiquino' },
  { key: 'TTD', label: 'TT$', name: 'Dólar de Trinidad y Tobago' },
  { key: 'BZD', label: 'BZ$', name: 'Dólar beliceño' },
  { key: 'GYD', label: 'G$', name: 'Dólar guyanés' },
  { key: 'SRD', label: 'Sr$', name: 'Dólar surinamés' },
  { key: 'BSD', label: 'B$', name: 'Dólar bahameño' },
  { key: 'BBD', label: 'Bds$', name: 'Dólar barbadense' },
  { key: 'XCD', label: 'EC$', name: 'Dólar del Caribe Oriental' },
];

export const get_currency = (key?: string) => {
  return AMERICAN_CURRENCIES.find((currency) => currency.key === key);
};
