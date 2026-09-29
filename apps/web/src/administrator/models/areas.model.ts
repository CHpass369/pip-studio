export interface Area {
  _id: string;
  name: string;
  description: string;
  image_id: string | null;
  banner_id?: string | null;
  code: string;
  group_id: string;
  enabled: boolean;
  phone?: string;
  shipping_prices?: Record<string, number>;
  payment_qr?: string | null;
}
