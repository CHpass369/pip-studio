import React, { useState } from 'react';
import { TextField } from '@mui/material';

import { Flex } from 'components/grids/v5';
import { ContentTitle } from 'components/titles/v3';

import { ITEMS_HEADER } from '../constants';
import { Measure } from 'app/models/measure.model';

interface SuggestionProps {
  item: { name?: string };
  measure?: Measure;
}

const Suggestion = ({ item, measure }: SuggestionProps) => {
  const [especifications, set_especifications] = useState('');

  const replace_template = (template: any, params: any) => {
    if (!template) {
      throw new Error('template is undefined');
    }
    if (!params) {
      throw new Error('params is undefined');
    }

    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => (
      Object.prototype.hasOwnProperty.call(params, key) ? params[key] : match
    ));
  };

  const especification_template = `
    Podrias ayudar a generar un texto de especificaciones tecnicas,
    para la construccion de un item de construccion.
    Un item de construccion es una actividad que forma parte de una obra de las actividades de un obra como ejemplo.
      Ej. Excavar, poner cimiento, contruir un muro, etc.

    - el item de construccion es: {{name}}
    - la unidad de medida es: {{measure}}

    solo nesecito que generes lo siguiente:

    1. Definición (uno o dos parrafos de texto)
    3. Procedimiento para la Ejecución (uno asta cuatro parrafos de texto)
  `;

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={ITEMS_HEADER} />
      <Flex.Buttoms>
        <TextField
          fullWidth
          multiline
          minRows={3}
          name="suggestion"
          label="Especificaciones tecnicas"
          value={replace_template(especification_template, {
            name: item.name,
            measure: measure?.name,
          })}
          onChange={(e) => set_especifications(e.target.value)}
        />
      </Flex.Buttoms>
    </Flex>
  );
};

export { Suggestion };
