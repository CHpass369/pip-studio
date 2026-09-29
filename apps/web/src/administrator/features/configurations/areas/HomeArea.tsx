import { useState } from 'react';

import { FormLabels } from 'components/forms/v1';
import { ContentTitle } from 'components/titles/v3';
import { Image } from 'components/images/v3';
import { AREA_DETAIL_TITLE } from '../areas.constants';
import { Area } from 'administrator/models/area.model';

interface HomeAreaProps {
  area: Area;
}

const HomeArea = ({ area }: HomeAreaProps) => {
  const [item] = useState(area);

  return (
    <FormLabels>
      <ContentTitle config={AREA_DETAIL_TITLE} />
      <FormLabels.Field>
        <FormLabels.Label value="Nombre" />
        <FormLabels.Input value={item.name} />
      </FormLabels.Field>
      <FormLabels.Field>
        <FormLabels.Label value="Descripción" />
        <FormLabels.Input value={item.description} />
      </FormLabels.Field>
      <FormLabels.Field>
        <FormLabels.Label value="Logo" />
        <Image image={item.image_id} direction={Image.H} height="150px" quality={1080} />
      </FormLabels.Field>
      <FormLabels.Field>
        <FormLabels.Label value="Banner" />
        <Image image={item.banner_id} direction={Image.H} height="150px" quality={1080} />
      </FormLabels.Field>
    </FormLabels>
  );
};

export { HomeArea };
