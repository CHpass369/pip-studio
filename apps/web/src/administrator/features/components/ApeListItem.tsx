import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Popup, List } from 'semantic-ui-react';

import { APE_LIST } from '../constants';
import { FieldGenerator } from './ApeListFields';

import './ApeList.scss';

const ApeListItem = ({ index, fields, item }) => {
  const [open, setOpen] = useState(false);
 
  const findField = (field, i) => {
    switch(field.type) {
      case APE_LIST.INDEX:
        return (
          <FieldGenerator key={i} type={field.type}>
            {index + 1 }
          </FieldGenerator>
        );
      case APE_LIST.OPTIONS: {
        const options = field.property;
        return (
          <Popup
            key={i}
            trigger={<Icon name='ellipsis vertical' />}
            position='bottom right'
            on='click'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
          >
            <Popup.Header>Opciones</Popup.Header>
            <Popup.Content>
              <List>
                {
                  options.map((option, i) => {
                    return (
                      <List.Item key={i}  onClick={() => {
                        setOpen(false);
                        option.callback(item);
                      }}>
                        <List.Icon name={option.icon} />
                        <List.Content>{option.label}</List.Content>
                      </List.Item>
                    );
                  })
                }
              </List>
            </Popup.Content>
          </Popup>
          
          // <Icon name='ellipsis vertical' />
        );
      }
      default: {
        const value = item[field.property];
        if (!value) {
          return (
            <b>Not found</b>
          );
        }
        return (
          <FieldGenerator key={i} type={field.type}>
            {value}
          </FieldGenerator>
        );
      }
    }
  };
  
  return (
    <div className="list-item list-item-efects">
      {
        fields.map((field, i) => findField(field, i))
      }
    </div>
  );
};

ApeListItem.propTypes = {
  index: PropTypes.string.isRequired,
  fields: PropTypes.shape(PropTypes.any).isRequired,
  item: PropTypes.any.isRequired,
};

export { ApeListItem };
