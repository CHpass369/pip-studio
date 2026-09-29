import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { EmptyInfo } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';

import { List } from '../general-list/List';
import { GeneralItem, GeneralTotals } from '../general-list/ListItem';
import { Area } from 'administrator/models/area.model';
import { ProjectModule } from 'app/models/project.model';

const EMPTY_LIST_MESSAGE = 'No existe modulos registradas';

interface ProjectGeneralProps {
  area: Area;
}

const ProjectGeneral = ({ area }: ProjectGeneralProps) => {
  const project = useSelector((state: any) => state.project);

  const convert = (accumulator: GeneralItem[], item: ProjectModule) => {
    const constructions = item.constructions.map((construction) => {
      return {
        name: construction.name,
        measure_id: construction.measure_id,
        quantity: construction.quantity,
        unit_price: construction.unit_price,
        sub_total: construction.quantity * construction.unit_price,
        materials_price: construction.materials.reduce((acc, o) => acc + (o.price * o.quantity * construction.quantity), 0),
        tools_price: construction.tools.reduce((acc, o) => acc + (o.price * o.quantity * construction.quantity), 0),
        workers_price: construction.workers.reduce((acc, o) => acc + (o.price * o.quantity * construction.quantity), 0),
        module_name: item.name,
        start_date: item.start_date,
        end_date: item.end_date,
      };
    });

    return accumulator.concat(constructions);
  };

  const sum_sub_total = (accumulator: GeneralTotals, item: GeneralItem) => {
    accumulator.sub_total += item.sub_total;
    accumulator.materials_price += item.materials_price;
    accumulator.tools_price += item.tools_price;
    accumulator.workers_price += item.workers_price;

    return accumulator;
  };

  const modules = project.modules.reduce(convert, [] as GeneralItem[]);
  const totals = modules.reduce(sum_sub_total, { sub_total: 0, materials_price: 0, tools_price: 0, workers_price: 0 });
  const on_select = useCallback((data: GeneralItem) => {   
    console.info('select general item:', data);
  }, []);

  return (
    <Flex class_name="text-separator">
      <Flex.Content>
        {(modules.length === 0) && <EmptyInfo description={EMPTY_LIST_MESSAGE} />}
        {(modules.length > 0) && <List items={modules} on_select={on_select} totals={totals} />}
      </Flex.Content>
    </Flex>
  );
};

export { ProjectGeneral };
