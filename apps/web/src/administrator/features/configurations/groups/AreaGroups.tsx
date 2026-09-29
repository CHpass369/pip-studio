import React, { useCallback, useEffect, useState } from 'react';

import api from 'administrator/api/globals/v3';
import { toast } from 'generics/services/v4';
import { BUTTON_LABELS } from 'components/generics/v2';
import { ContentTitle } from 'components/titles/v3';
import { useNavigate } from 'react-router';
import { Flex } from 'components/grids/v5';
import { WButton } from 'components/forms/v3';
import { LinearList } from 'components/lists/v1';
import { AREA_GROUPS_TITLE } from '../groups.constants';
import { Area } from 'administrator/models/area.model';
import { Group } from 'administrator/models/group.model';

interface AreaGroupsProps {
  area: Area;
}

const AreaGroups = ({ area }: AreaGroupsProps) => {
  const navigate = useNavigate();
  const [groups, set_groups] = useState<Group[]>([]);

  const on_create = useCallback(() => {
    api.groups.create({
      name: 'Group Inc.',
      description: 'description generator',
      image_id: null,
      enabled: true,
    })
    .then(({ data }) => {
      set_groups([data, ...groups]);
    })
    .catch(toast.api_danger);
  }, [groups]);

  const on_select = useCallback((group: Group) => {
    navigate(`/configuration/groups/${group._id}`);
  }, [navigate]);

  useEffect(() => {
    /* eslint-disable no-console */
    console.log(area);

    api.groups.find({})
    .then(({ data }) => {
      set_groups(data);
    })
    .catch(toast.api_danger);
  }, [area]);

  return (
    <div>
      <ContentTitle config={AREA_GROUPS_TITLE} />
      <Flex.Item>
        <Flex.End>
          <WButton variant="contained" on_click={on_create} label={BUTTON_LABELS.NEW} />
        </Flex.End>
        <LinearList items={groups} on_select={on_select} />
      </Flex.Item>
    </div>
  );
};

export { AreaGroups };
