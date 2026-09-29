import React from 'react';
import { useNavigate } from 'react-router';
import { ROUTE } from '../constants';
import { ConstructionCreate } from './ConstructionCreate';
import { useSelector } from 'react-redux';
import { Area } from 'administrator/models/area.model';

interface GItemProps {
  area: Area;
  clone?: boolean;
}

const GItem = ({ area }: GItemProps) => {
  const navigate = useNavigate();
  const { parameters } = useSelector((state: any) => state.settings);
    

  const on_update = () => {
  };

  const on_cancel = () => {
    navigate(ROUTE.LIST);
  };

  return (
    <ConstructionCreate
      area={area}
      on_update={on_update}
      on_cancel={on_cancel}
      parameters={parameters}
    />
  );
};

export { GItem };
