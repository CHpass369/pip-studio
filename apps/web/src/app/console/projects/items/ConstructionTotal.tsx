import React from 'react';

import { Flex } from 'components/grids/v5';
import { Label } from 'components/labels/v1';

import './ProjectTotal.scss';
import { calculate } from 'app/console/calc_parameters/calculator';

interface ConstructionTotalProps {
  totals: any;
  parameters: any;
}

const ConstructionTotal = ({ totals, parameters }: ConstructionTotalProps) => {

  const calc_params = calculate(parameters, [totals.materials, totals.workers, totals.tools]);
  const total = calc_params[calc_params.length - 1]

  return (
    <Flex.Scrap class_name="project-total">
      <div>
        Precio Unitario Bs <Label.Rounding value={total} />
      </div>
      <div>
        Total Bs <Label.Rounding value={totals.materials + totals.workers + totals.tools} />
      </div>
    </Flex.Scrap>
  );
};

export { ConstructionTotal };
