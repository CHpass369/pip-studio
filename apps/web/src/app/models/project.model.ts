import { Parameter } from './parameter.model';
import { ResourceLine } from './resource.model';

export interface LockedBy {
  _id: string;
  username: string;
}

export interface ProjectCurrency {
  international?: string;
  local?: string;
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export type GeolocationType = 'area' | 'line';

export interface Geolocation {
  type: GeolocationType;
  points: GeoPoint[];
}

export interface ConstructionPrices {
  materials: number;
  tools: number;
  workers: number;
}

// a construction (item) placed inside a project module, before its prices are calculated
export interface ProjectConstructionBase {
  _id: string;
  area_id: string;
  construction_id: string;
  name: string;
  materials_price: number;
  tools_price: number;
  workers_price: number;
  price: number;
  measure_id: string;
  quantity: number;
  metric_calculation: any;
  is_critical?: boolean;
  offset_days?: number;
  days?: number;
  start_date?: string;
  end_date?: string;
  materials: ResourceLine[];
  workers: ResourceLine[];
  tools: ResourceLine[];
  created: string;
}

// the same construction once its prices were calculated
export interface ProjectConstruction extends ProjectConstructionBase {
  prices: ConstructionPrices;
  unit_price: number;
  sub_total: number;
}

export interface ProjectModule {
  _id: string;
  name: string;
  constructions: ProjectConstruction[];
  is_active: boolean;
  start_date: string;
  end_date: string;
  is_lock: boolean;
  locked_by?: LockedBy | null;
  is_production: boolean;
}

export interface Project {
  _id: string;
  area_id: string;
  name: string;
  description: string;
  address: string;
  builder?: string;
  client_name?: string;
  client_number?: string;
  currency?: ProjectCurrency;
  currency_value?: number;
  start_date: string;
  end_date: string;
  parameter_id?: string;
  parameters: Parameter[];
  zones?: string[];
  geolocation?: Geolocation;
  modules: ProjectModule[];
  is_lock?: boolean;
  locked_by?: LockedBy | null;
  created?: string;
  updated?: string;
}
