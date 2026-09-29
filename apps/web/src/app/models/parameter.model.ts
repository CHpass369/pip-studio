export interface Parameter {
  key: string;
  label: string;
  formula: string;
  ratio: number;
  is_total: boolean;
}

// set of calculation parameters stored by the area
export interface ParameterSet {
  _id: string;
  area_id: string;
  name: string;
  parameters: Parameter[];
  formula: string;
  description: string;
  created?: string;
}
