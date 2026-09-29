import { ResourceLine } from './resource.model';

export interface Especifications {
  definition: string;
  equipment: string;
  procedure: string;
  measurement: string;
  payment: string;
}

export interface Construction {
  _id: string;
  area_id: string;
  name: string;
  price: number;
  measure_id: string;
  description: string;
  tools: ResourceLine[];
  materials: ResourceLine[];
  workers: ResourceLine[];
  especifications: Especifications;
  created?: string;
}
