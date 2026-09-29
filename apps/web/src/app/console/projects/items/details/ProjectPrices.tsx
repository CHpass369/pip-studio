import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EmptyInfo } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';

import actions from 'store/actions/console';
import { populate_construction_totals } from '../../defaultModuleData';
import { List } from '../prices-list/List';
import { PriceItem } from '../prices-list/ListItem';
import { ResourceLine } from 'app/models/resource.model';
import { ProjectConstruction, ProjectModule } from 'app/models/project.model';

const EMPTY_LIST_MESSAGE = 'No existe materiales registrados';

const ProjectPrices = () => {
  const dispatch = useDispatch();
  const project = useSelector((state: any) => state.project);
  const { materials } = useSelector((state: any) => state.project_assets);

  const get_material = (material_id: string) => materials.find((material) => material._id === material_id) || null;

  const convert = (accumulator: PriceItem[], module: ProjectModule) => {
    if (!module.is_active) {
      return accumulator;
    }

    accumulator.push({ kind: 'separator', label: module.name?.toUpperCase() });

    module.constructions.forEach((construction) => {
      construction.materials.forEach((material_entry) => {
        const material = get_material(material_entry._id);
        const market_price = material ? material.price : 0;

        accumulator.push({
          kind: 'material',
          name: material ? material.name : '',
          quantity: material_entry.quantity,
          market_price,
          market_total: market_price * material_entry.quantity,
          project_price: material_entry.price,
          project_total: material_entry.price * material_entry.quantity,
          module_id: module._id,
          construction,
          material_entry,
        });
      });
    });

    return accumulator;
  };

  const items = project.modules.reduce(convert, [] as PriceItem[]);

  const on_update = useCallback((module_id: string, construction: ProjectConstruction, material_entry: ResourceLine, market_price: number) => {
    if (!module_id || !construction || !material_entry) {
      throw new Error('parameters is undefined');
    }

    const updated_materials = construction.materials.map((entry) => (
      entry._id === material_entry._id ? { ...entry, price: market_price } : entry
    ));

    const updated_construction = populate_construction_totals(project.parameters, {
      ...construction,
      materials: updated_materials,
    });

    dispatch(actions.project.update_construction(module_id, updated_construction));
  }, [dispatch, project.parameters]);

  return (
    <Flex class_name="text-separator">
      <Flex.Content>
        {(items.length === 0) && <EmptyInfo description={EMPTY_LIST_MESSAGE} />}
        {(items.length > 0) && <List items={items} on_update={on_update} />}
      </Flex.Content>
    </Flex>
  );
};

export { ProjectPrices };
