import { GENERIC } from 'generics/constants';

import video_projects from '../../../assets/tutoriales/administrar_projectos.mp4';
import video_constructions from '../../../assets/tutoriales/administrar_items.mp4';
import video_resources from '../../../assets/tutoriales/administrar_recursos.mp4';
import video_users from '../../../assets/tutoriales/administrar_usuarios.mp4';

export const ROUTE = {
  LIST: `${GENERIC.APP_BASE_URL}/tutorials`,
};

const CONTEXT = 'Tutoriales';
const TITLE = 'lista de tutoriales';
export const ITEMS_HEADER = {
  context: CONTEXT,
  title: TITLE,
  description: 'videos de ayuda sobre el uso de la plataforma',
};

export const TUTORIALS = [
  {
    _id: 'projects',
    title: 'Proyectos',
    description: 'Como crear y administrar proyectos.',
    video: video_projects,
  },
  {
    _id: 'constructions',
    title: 'Items de construcción',
    description: 'Como administrar los items de construcción.',
    video: video_constructions,
  },
  {
    _id: 'resources',
    title: 'Recursos',
    description: 'Como administrar materiales, mano de obra y herramientas.',
    video: video_resources,
  },
  {
    _id: 'users',
    title: 'Usuarios',
    description: 'Como administrar usuarios.',
    video: video_users,
  },
];
