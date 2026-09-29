import React, { useEffect } from 'react';
import moment, { Moment } from 'moment';
import PropTypes from 'prop-types';

import api from 'administrator/api/settings/v1';
import { useFormReducer } from 'generics/functions/forms/v2';
import { toast } from 'generics/services/v4';
import { AREA_UPDATE_TITLE } from '../setting.constants';
import { Area } from 'administrator/models/area.model';
import { Setting } from '../models/setting.model';
import { ContentTitle } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import { WButton, WDateField, WNumberField, WTextField } from 'components/forms/v3';

const CONSUMER_RIGHT = [
  'Ley N° 453:',
  'El proveedor debe brindar atención sin',
  'discriminación, con respecto, calidez y cordialidad',
  'a los usuarios y consumidores',
].join(' ');

interface SettingInvoiceProps {
  area: Area;
}

interface SettingInvoiceForm extends Omit<Setting, 'invoice_emission_deadline'> {
  invoice_emission_deadline?: Moment;
}

const SettingInvoice = ({ area }: SettingInvoiceProps) => {
  const {
    item,
    set_item,
    on_string_change,
    on_number_change,
  } = useFormReducer<Partial<SettingInvoiceForm>>({});

  const on_update = () => {
    api.settings.update(area._id, item as Partial<Setting>)
    .then(() => {
      toast.success('se actualizo correctamente');
    })
    .catch(toast.api_danger);
  };

  const render_emision_deadline = () => {
    if (!item.invoice_emission_deadline) {
      return null;
    }

    const on_date_change = (event: any) => {
      set_item({ ...item, invoice_emission_deadline: moment(event.target.value) });
    };

    return (
      <WDateField
        name="invoice_emission_deadline"
        label="Fecha limite de emision"
        value={item.invoice_emission_deadline.format('YYYY-MM-DD')}
        onChange={on_date_change}
      />
    );
  };

  useEffect(() => {
    api.settings.get_by_id(area._id)
    .then(({ data }) => {
      set_item({
        invoice_authorization_number: data.invoice_authorization_number || 'AUTH000000',
        invoice_dosage_key: data.invoice_dosage_key || 'DOSAGE000000',
        invoice_counter: data.invoice_counter || 1000,
        invoice_min: data.invoice_min || 1000,
        invoice_max: data.invoice_max || 9000,
        invoice_emission_deadline: data.invoice_emission_deadline ? moment(data.invoice_emission_deadline) : moment().startOf('day'),
        invoice_consumer_right: data.invoice_consumer_right || CONSUMER_RIGHT,
      });
    })
    .catch(toast.api_danger);
  }, [set_item, area]);

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={AREA_UPDATE_TITLE} />
      <Flex.Item>
        <Flex.Content>
          <WTextField name="invoice_authorization_number" label="Numero de autorización" value={item.invoice_authorization_number} onChange={on_string_change} />
          <WTextField name="invoice_dosage_key" label="Codigo de dosificación" value={item.invoice_dosage_key} onChange={on_string_change} />
          {render_emision_deadline()}
          <WNumberField name="invoice_counter" label="Contador factura" value={item.invoice_counter} onChange={on_number_change} />
          <WNumberField name="invoice_min" label="Numero de factura inicial" value={item.invoice_min} onChange={on_number_change} />
          <WNumberField name="invoice_max" label="Numero de factura limite" value={item.invoice_max} onChange={on_number_change} />
          <WTextField name="invoice_consumer_right" label="Dereho del consumidor" value={item.invoice_consumer_right} onChange={on_string_change} />
        </Flex.Content>
        <Flex.Buttoms>
          <WButton variant="contained" on_click={on_update} label="Actualizar información" />
        </Flex.Buttoms>
      </Flex.Item>
    </Flex>
  );
};

SettingInvoice.propTypes = {
  area: PropTypes.any.isRequired,
};

export { SettingInvoice };
