import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Flex } from 'components/grids/v5';
import { FormLabels } from 'components/forms/v1';

import { ContentTitle } from 'components/titles/v3';
import { Image } from 'components/images/v3';
import api from 'administrator/api/settings/v1';
import { toast } from 'generics/services/v4';
import { AREA_DETAIL_TITLE } from '../setting.constants';
import { Area } from 'administrator/models/area.model';
import { Setting } from '../models/setting.model';

interface SettingDetailProps {
  area: Area;
}

const SettingDetail = ({ area }: SettingDetailProps) => {
  const [item, set_item] = useState<Partial<Setting>>({});

  useEffect(() => {
    api.settings.get_by_id(area._id)
    .then(({ data }) => {
      set_item(data);
    })
    .catch(toast.api_danger);
  }, [set_item, area]);

  return (
    <>
      <ContentTitle config={AREA_DETAIL_TITLE} />
      <Flex.Scrap>
        <FormLabels>
          <FormLabels.Field>
            <FormLabels.Label value="NIT" />
            <FormLabels.Input value={item.area_nit} />
          </FormLabels.Field>
          <FormLabels.Field>
            <FormLabels.Label value="Telefono" />
            <FormLabels.Input value={item.area_phone} />
          </FormLabels.Field>
          <FormLabels.Field>
            <FormLabels.Label value="Dirección" />
            <FormLabels.Input value={item.area_address} />
          </FormLabels.Field>
          <FormLabels.Field>
            <FormLabels.Label value="Ciudad" />
            <FormLabels.Input value={item.area_city} />
          </FormLabels.Field>
          {/* <Image image={item.image_id} direction={Image.H} height="150px" quality={1080} /> */}
        </FormLabels>
      </Flex.Scrap>
    </>
  );
};

SettingDetail.propTypes = {
  area: PropTypes.any.isRequired,
};

export { SettingDetail };
