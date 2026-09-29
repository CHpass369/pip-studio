import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { GENERIC } from 'generics/constants';
import { MenuOption, set_administration_option, set_main_option } from 'store/slices/global/menu.slice';

const MAIN_OPTIONS: MenuOption[] = [
  { key: 'folder', label: 'Projectos', uri: `${GENERIC.APP_BASE_URL}/projects` },
  { key: 'map', label: 'Mapa de projectos', uri: `${GENERIC.APP_BASE_URL}/projects-map` },
  { key: 'construction', label: 'Lista de items', uri: `${GENERIC.APP_BASE_URL}/constructions` },
  { key: 'boxes', label: 'Materiales', uri: `${GENERIC.APP_BASE_URL}/materials` },
  { key: 'engineering', label: 'Mano de obra', uri: `${GENERIC.APP_BASE_URL}/workers` },
  { key: 'handyman', label: 'Htas. y equipo', uri: `${GENERIC.APP_BASE_URL}/tools` },
  { key: 'expand', label: 'Unidades', uri: `${GENERIC.APP_BASE_URL}/measures` },
  { key: 'percent', label: 'Parametros', uri: `${GENERIC.APP_BASE_URL}/parameters` },
  { key: 'location', label: 'Zonas', uri: `${GENERIC.APP_BASE_URL}/zones` },
  { key: 'school', label: 'Tutoriales', uri: `${GENERIC.APP_BASE_URL}/tutorials` },
];

const ADMINISTRATION_OPTIONS: MenuOption[] = [
  { key: 'tune', label: 'Parametros globales', uri: '/settings/parameters' },
  { key: 'setting', label: 'Administración', uri: '/configuration/detail' },
];

// publishes the options of the console menu, the menu itself is rendered by the header
const MenuOptions = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(set_main_option(MAIN_OPTIONS));
    dispatch(set_administration_option(ADMINISTRATION_OPTIONS));
  }, [dispatch]);

  return null;
};

export { MenuOptions };
