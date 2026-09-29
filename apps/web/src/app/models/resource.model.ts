import { Measure } from './measure.model';

export type ResourceType = 'materials' | 'tools' | 'workers';

// materials, tools and workers share the same shape
export interface Resource {
  _id: string;
  area_id: string;
  name: string;
  price: number;
  measure_id: string;
  measure?: Measure;
  description: string;
  created?: string;
}

// a resource used by a construction
export interface ResourceLine {
  _id: string;
  price: number;
  quantity: number;
  created: string;
}
