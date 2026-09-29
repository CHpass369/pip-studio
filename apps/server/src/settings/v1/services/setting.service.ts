import moment from 'moment';
import { GeneratorRepository, GeneratorService, GeneratorType } from 'apps-generic';
import type { NextFunction, Request, Response } from 'express';
import { Setting } from '../../models/setting';

const CONSUMER_RIGHT = [
  'Ley N° 453:',
  'El proveedor debe brindar atención sin',
  'discriminación, con respecto, calidez y cordialidad',
  'a los usuarios y consumidores',
].join(' ');

const build_default_setting = () => ({
  area_name: 'Generator S.A.', // setting
  area_owner: 'Master S.A.',
  area_headquarter: '',
  area_activity: 'Ninguna',
  area_nit: 'NIT000000',
  area_phone: 'PHONE000000',
  area_address: 'ADDRESS000000',
  area_city: 'CIUDAD000000',

  parameters: [
    { key: 'A', label: 'MATERIALES', formula: '*', ratio: 0, is_total: false },
    { key: 'B', label: 'MANO DE OBRA', formula: '*', ratio: 0, is_total: false },
    { key: 'C', label: 'EQUIPO, MAQUINARIA Y HERRAMIENTAS', formula: '*', ratio: 0, is_total: false },
    { key: 'D', label: 'TOTAL MATERIALES', formula: 'A', ratio: 0, is_total: true },
    { key: 'E', label: 'MANO DE OBRA INDIRECTA', formula: 'B', ratio: 0, is_total: false },
    { key: 'F', label: 'CARGAS SOCIALES', formula: 'B', ratio: 55, is_total: false },
    { key: 'G', label: 'TOTAL MANO DE OBRA', formula: 'B+E+F', ratio: 0, is_total: true },
    { key: 'H', label: 'HERRAMIENTAS MENORES', formula: 'B', ratio: 5, is_total: false },
    { key: 'I', label: 'TOTAL HERRAMIENTAS', formula: 'C+H', ratio: 0, is_total: true },
    { key: 'J', label: 'SUB TOTAL', formula: 'D+G+I', ratio: 0, is_total: true },
    { key: 'K', label: 'INPREVISTOS', formula: 'J', ratio: 0, is_total: false },
    { key: 'L', label: 'GASTOS GENERALES', formula: 'J', ratio: 5, is_total: false },
    { key: 'M', label: 'UTILIDAD', formula: 'J', ratio: 5, is_total: false },
    { key: 'N', label: 'PARCIAL', formula: 'J+K+L+M', ratio: 0, is_total: true },
    { key: 'O', label: 'IMPUESTOS IVA', formula: 'N', ratio: 14.94, is_total: false },
    { key: 'P', label: 'IMPUESTOS IT', formula: 'N', ratio: 3.9, is_total: false },
    { key: 'Q', label: 'N/A', formula: 'N', ratio: 0, is_total: false },
    { key: 'T', label: 'TOTAL ITEM', formula: 'N+O+P', ratio: 0, is_total: true },
  ],
  currency: {
    international: 'USD',
    local: 'BOB',
  },
  currency_value: 6.96,
  report_style: {
    color: '#1a1a1a',
    font_size: 12,
    font_family: 'Arial, Helvetica, sans-serif',
    table_header_color: '#e6e6e6',
    modules_color: '#d9d9d9',
    total_color: '#bfbfbf',
  },
  round: 2,

  image_id: null, // defaults
});

export class SettingService extends GeneratorService {

  static show_or_create(type: GeneratorType<Setting>) {
    if (!type) {
      throw new Error('type is undefined');
    }

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const params = req.params;

        const item = await GeneratorRepository.find_by_id(type, params._id);
        if (item) {
          res.json(item);
          return;
        }

        const result = await GeneratorRepository.save(
          Object.assign(new type(), { _id: params._id, ...build_default_setting() })
        );
        res.json(result);
      } catch (err) {
        next(err);
      }
    }
  }

  static update(type: GeneratorType<Setting>) {
    if (!type) {
      throw new Error('type is undefined');
    }

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const params = req.params;
        const body = req.body;

        if (body.order_date) {
          body.order_date = moment(body.order_date).toDate();
        }

        const item = await GeneratorRepository.find_by_id(type, params._id);
        if (item) {
          const result = await GeneratorRepository.update(item, body);
          res.json(result);
          return;
        }

        const result = await GeneratorRepository.save(
          Object.assign(new type(), { _id: params._id, ...body })
        );
        res.json(result);
      } catch (err) {
        next(err);
      }
    }
  }
}
