import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import actions from 'store/actions/console';
import { CalcParameters } from 'app/console/calc_parameters/CalcParameters';
import { Area } from 'administrator/models/area.model';

export const EMPTY_LIST_MESSAGE = 'No existe los parametros de calculo registradas';

interface ProjectParametersProps {
  area: Area;
}

const ProjectParameters = ({ area }: ProjectParametersProps) => {
  const dispatch = useDispatch();
  const { parameters } = useSelector((state: any) => state.project);
  const partials = [5000, 3000, 2000];

  const on_change = useCallback((data: any) => {
    dispatch(actions.project.update_parameters(data));
  }, [dispatch]);

  if (!parameters) return;

  return (
    <CalcParameters partials={partials} items={parameters} on_change={on_change} display_parcial={true} title={false} />
  );
};

export { ProjectParameters };
