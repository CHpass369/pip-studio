import React from 'react';
import { Flex } from 'components/grids/v5';

import { ListItem } from './ListItem';
import { Label } from 'components/labels/v1';
import { construction_total_course } from 'app/console/calc_parameters/calculator';
import { Resource, ResourceLine, ResourceType } from 'app/models/resource.model';

interface ListProps {
  items: ResourceLine[];
  on_select: (type: ResourceType, item: ResourceLine) => void;
  data: Resource[];
  type: ResourceType;
  on_update_quantity: (type: ResourceType, item: ResourceLine) => void;
  is_construction?: boolean;
}

const List = ({ items, on_select, data, type, on_update_quantity, is_construction = true }: ListProps) => {
  let title;

  switch (type) {
    case 'materials':
      title = 'Materiales';
      break;
    case 'tools':
      title = 'Herramienta y equipo';
      break;
    case 'workers':
      title = 'Mano de obra';
      break;
    default:
      title = '';
      break;
  }

  const render_item = (item: ResourceLine, index: number) => {
    let filtered_item;
    switch (type) {
      case 'materials':
        filtered_item = data.find((data) => data._id === item._id);
        break;
      case 'tools':
        filtered_item = data.find((data) => data._id === item._id);
        break;
      case 'workers':
        filtered_item = data.find((data) => data._id === item._id);
        break;
      default:
        break;
    }

    return (
      <ListItem 
        key={index} 
        index={index + 1}
        item={item} 
        on_select={on_select}
        material={filtered_item}
        type={type}
        on_update_quantity={on_update_quantity}
        is_construction={is_construction}
      />
    );
  }


  return (
    <Flex direction={Flex.V} class_name="report-history-list">
      <Flex.Scrap>
        {title}  
      </Flex.Scrap>
      {/* <Flex.Scrap class_name="report-list-item"></Flex.Scrap> */}
      <Flex.Scrap class_name="report-list-item">
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}>Nro</Flex.Item>
          <Flex.Item flex={3}>Nombre</Flex.Item>
          <Flex.Item flex={4}>Precio mercado</Flex.Item>
          {
            is_construction && <Flex.Item flex={4}>Precio projecto</Flex.Item>
          }
          <Flex.Item flex={2}>Cantidad</Flex.Item>
          <Flex.Item flex={2}>Fecha</Flex.Item>
          <Flex.Item flex={2}>Quitar</Flex.Item>
        </Flex>
      </Flex.Scrap>
      {items.map(render_item)}
      <Flex direction={Flex.H}>
        <Flex.Item flex={4}>Total Parcial</Flex.Item>
        <Flex.Item flex={4}>
          <Label.BsCoin value={construction_total_course(items, data, false)} />
        </Flex.Item>
        {
          is_construction && (
            <Flex.Item flex={4}>
              <Label.BsCoin value={construction_total_course(items, data, true)} />
            </Flex.Item>
          )
        }
        <Flex.Item flex={2}></Flex.Item>
        <Flex.Item flex={2}></Flex.Item>
        <Flex.Item flex={2}></Flex.Item>
      </Flex>
    </Flex>
  );
};

export { List };
