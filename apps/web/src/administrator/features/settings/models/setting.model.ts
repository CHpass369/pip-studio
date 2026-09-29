export interface Setting {
  _id?: string;

  area_name?: string;
  area_owner?: string;
  area_headquarter?: string;
  area_activity?: string;
  area_nit?: string;
  area_phone?: string;
  area_address?: string;
  area_city?: string;
  area_logo?: string | null;
  area_payment_qr?: string | null;
  shipping_prices?: Record<string, number>;

  invoice_authorization_number?: string;
  invoice_dosage_key?: string;
  invoice_counter?: number;
  invoice_min?: number;
  invoice_max?: number;
  invoice_emission_deadline?: string;
  invoice_consumer_right?: string;

  order_index_counter?: number;
  sale_counter?: number;
  buy_counter?: number;
  printer_type?: 'invoice' | 'half_card';

  order_counter?: number;
  order_nim?: number;
  order_max?: number;
  order_prefix?: string;
  order_suffix?: string;
  order_restart?: boolean;

  image_id?: string | null;
}
