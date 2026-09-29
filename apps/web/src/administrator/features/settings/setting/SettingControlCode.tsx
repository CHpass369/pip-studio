import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import api from 'administrator/api/settings/v1';
import billings_api from 'administrator/api/billings/v1';
import { useFormReducer } from 'generics/functions/forms/v2';
import { toast } from 'generics/services/v4';
import { AREA_UPDATE_TITLE } from '../setting.constants';
import { Area } from 'administrator/models/area.model';
import { ContentTitle } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import { WButton, WTextField } from 'components/forms/v3';

import './SettingControlCode.scss';

interface SettingControlCodeProps {
  area: Area;
}

interface ControlCodeTestForm {
  area_id?: string;
  invoice_authorization_number?: string;
  invoice_dosage_key?: string;
  invoice_counter?: string;
  customer_index?: string;
  date?: string;
  total?: string;
}

const SettingControlCode = ({ area }: SettingControlCodeProps) => {
  const {
    item,
    set_item,
    on_string_change,
  } = useFormReducer<Partial<ControlCodeTestForm>>({});
  const [control_code_text, set_control_code_text] = useState<string | null>(null);

  const on_test = () => {
    billings_api.control_codes.test(item)
    .then(({ data }) => {
      set_control_code_text(data.control_code_text);
      toast.success('El test fue exitoso');
    })
    .catch(toast.api_danger);
  };

  useEffect(() => {
    api.settings.get_by_id(area._id)
    .then(({ data }) => {
      set_item({
        area_id: area._id,
        invoice_authorization_number: data.invoice_authorization_number,
        invoice_dosage_key: data.invoice_dosage_key,
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
          <div className="control-code-text">
            {control_code_text}
          </div>
          <WTextField name="invoice_counter" label="Numero de factura" value={item.invoice_counter} onChange={on_string_change} />
          <WTextField name="customer_index" label="CI/NIT" value={item.customer_index} onChange={on_string_change} />
          <WTextField name="date" label="Fecha" value={item.date} onChange={on_string_change} />
          <WTextField name="total" label="Total" value={item.total} onChange={on_string_change} />
        </Flex.Content>
        <Flex.Buttoms>
          <WButton variant="contained" on_click={on_test} label="Testear codigo de control" />
        </Flex.Buttoms>
      </Flex.Item>
    </Flex>
  );
};

SettingControlCode.propTypes = {
  area: PropTypes.any.isRequired,
};

export { SettingControlCode };
