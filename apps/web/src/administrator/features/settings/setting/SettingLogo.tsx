import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import api from 'administrator/api/settings/v1';
import { useFormReducer } from 'generics/functions/forms/v2';
import { toast } from 'generics/services/v4';
import { ContentTitle } from 'components/titles/v3';
import { UImage } from 'components/images/v3';
import { Flex } from 'components/grids/v5';
import { AREA_UPDATE_TITLE } from '../setting.constants';
import { WButton } from 'components/forms/v3';
import { Area } from 'administrator/models/area.model';
import { Setting } from '../models/setting.model';

interface SettingLogoProps {
  area: Area;
}

const SettingLogo = ({ area }: SettingLogoProps) => {
  const {
    item,
    set_item,
    on_image_change,
  } = useFormReducer<Partial<Setting>>({});

  const on_update = () => {
    api.settings.update(area._id, item)
    .then(() => {
      toast.success('se actualizo correctamente');
    })
    .catch(toast.api_danger);
  };

  useEffect(() => {
    api.settings.get_by_id(area._id)
    .then(({ data }) => {
      set_item({
        image_id: data.image_id,
      });
    })
    .catch(toast.api_danger);
  }, [set_item, area]);

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={AREA_UPDATE_TITLE} />
      <Flex.Item>
        <Flex.Content>
          <UImage image={item.image_id} height="150px" quality={1080} on_callback={on_image_change} />
        </Flex.Content>
        <Flex.Buttoms>
          <WButton variant="contained" on_click={on_update} label="Actualizar información" />
        </Flex.Buttoms>
      </Flex.Item>
    </Flex>
  );
};

SettingLogo.propTypes = {
  area: PropTypes.any.isRequired,
};

export { SettingLogo };
