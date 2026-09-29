import React, { useCallback } from 'react';
import { Flex } from 'components/grids/v5';
import { useReduxReducer } from 'generics/functions/forms/v2';
import { Label } from 'components/labels/v1';
import { Parameter } from 'app/models/parameter.model';

interface ListItemProps {
  index: number;
  item: Parameter;
  budget: number[];
  on_change: (parameter: Parameter) => void;
  display_parcial: boolean;
}

const ListItem = ({ index, item, budget, on_change, display_parcial }: ListItemProps) => {
  const {
    item: data,
    on_float_change,
    on_string_change,
    on_checkbox_change,
  } = useReduxReducer(item, on_change);

  return (
    <Flex.Scrap class_name="report-list-item form-base">
      <div>
        <Flex direction={Flex.H}>
          <Flex.Item flex={1}>
            {item.key}
          </Flex.Item>
          <Flex.Item flex={6}>
            <input type="text" value={data.label} name="label" className="quantity-input" onChange={on_string_change} />
          </Flex.Item>
          {
            !display_parcial || (
              <Flex.Item flex={2}>
                <Label.BsCoin value={budget[index]} />
              </Flex.Item>
            )
          }
          <Flex.Item flex={1}>
            <input type="checkbox" checked={data.is_total} name="is_total" className="quantity-input" onChange={on_checkbox_change} />
          </Flex.Item>
          <Flex.Item flex={1}>
            <input type="number" value={data.ratio} name="ratio" className="quantity-input" onChange={on_float_change}/>
          </Flex.Item>
          <Flex.Item flex={1}>
            <input type="text" value={data.formula} name="formula" className="quantity-input" onChange={on_string_change} />
          </Flex.Item>
        </Flex>
      </div>
    </Flex.Scrap>
  );
};

export { ListItem };
