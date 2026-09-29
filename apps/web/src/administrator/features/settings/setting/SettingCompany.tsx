import React, { ChangeEvent, useCallback, useEffect } from 'react';

import api from 'administrator/api/settings/v1';
import { toast } from 'generics/services/v4';
// import { DEFAULT_SHIPPING_PRICE, PLACES, PLACE_KEYS, PlaceKey } from 'app/console/constants/console.constants';
import { ContentTitle } from 'components/titles/v3';
import { Flex } from 'components/grids/v5';
import { useFormReducer } from 'generics/functions/forms/v2';
import { WButton, WNumberField, WTextField } from 'components/forms/v3';
import { UImage } from 'components/images/v3';

import { AREA_UPDATE_TITLE } from '../setting.constants';
import { Area } from 'administrator/models/area.model';
import { Setting } from '../models/setting.model';

import './SettingCompany.scss';

interface SettingCompanyProps {
  area: Area;
}

const SettingCompany = ({ area }: SettingCompanyProps) => {
  const {
    item,
    set_item,
    on_string_change,
  } = useFormReducer<Partial<Setting>>({});

  const on_update = () => {
    api.settings.update(area._id, item)
    .then(() => {
      toast.success('se actualizo correctamente');
    })
    .catch(toast.api_danger);
  };

  const handle_payment_qr = useCallback(({ image_id }: { image_id: string }) => {
    set_item((prev) => ({ ...prev, area_payment_qr: image_id }));
  }, [set_item]);

  const handle_shipping_price = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    set_item((prev) => ({
      ...prev,
      shipping_prices: { ...prev.shipping_prices, [name]: parseFloat(value) },
    }));
  }, [set_item]);

  useEffect(() => {
    api.settings.get_by_id(area._id)
    .then(({ data }) => {
      set_item({
        area_name: data.area_name || 'Name S.A.',
        area_owner: data.area_owner || 'Dueños S.A.',
        area_headquarter: data.area_headquarter || '',
        area_activity: data.area_activity || 'Ninguna',
        area_nit: data.area_nit || 'NIT000000',
        area_phone: data.area_phone || 'PHONE000000',
        area_address: data.area_address || 'ADDRESS000000',
        area_city: data.area_city || 'CIUDAD000000',
        area_logo: data.area_logo || null,
        area_payment_qr: data.area_payment_qr || null,
        shipping_prices: Object.fromEntries(
          PLACE_KEYS.map((key) => [key, data.shipping_prices?.[key] ?? DEFAULT_SHIPPING_PRICE]),
        ),
      });
    })
    .catch(toast.api_danger);
  }, [set_item, area]);

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={AREA_UPDATE_TITLE} />
      <Flex.Item>
        <Flex.Content>
          <WTextField name="area_name" label="Nombre" value={item.area_name} onChange={on_string_change} />
          <WTextField name="area_owner" label="Dueño" value={item.area_owner} onChange={on_string_change} />
          <WTextField name="area_headquarter" label="Casa matriz" value={item.area_headquarter} onChange={on_string_change} />
          <WTextField name="area_activity" label="Actividad economica" value={item.area_activity} onChange={on_string_change} />
          <WTextField name="area_nit" label="NIT" value={item.area_nit} onChange={on_string_change} />
          <WTextField name="area_phone" label="Telefono (con código de país)" value={item.area_phone} onChange={on_string_change} />
          <WTextField name="area_address" label="Dirección" value={item.area_address} onChange={on_string_change} />
          <WTextField name="area_city" label="Ciudad" value={item.area_city} onChange={on_string_change} />
          <label>QR de pago</label>
          <UImage image={item.area_payment_qr ?? undefined} height="150px" on_callback={handle_payment_qr} />
          <label>Precios de envío</label>
          <div className="shipping-prices">
            {PLACE_KEYS.map((key: PlaceKey) => (
              <React.Fragment key={key}>
                <span>{PLACES[key]}</span>
                <WNumberField
                  name={key}
                  label="Precio"
                  value={item.shipping_prices?.[key] ?? DEFAULT_SHIPPING_PRICE}
                  onChange={handle_shipping_price}
                />
              </React.Fragment>
            ))}
          </div>
        </Flex.Content>
        <Flex.Buttoms>
          <WButton variant="contained" on_click={on_update} label="Actualizar información" />
        </Flex.Buttoms>
      </Flex.Item>
    </Flex>
  );
};

export { SettingCompany };
