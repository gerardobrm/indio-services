import { TableInstance } from 'components/tables/ControlledTable';
import { SundriesPayload } from 'services/payloads/SundriesPayload';
import { JsonApiClient } from 'services/client/JsonApiClient';
import { ax } from '../util';

const client = new JsonApiClient(SundriesPayload, ax, 'sundries');
export class SundriesService {

  static getById = async (id: string) => {
    const result = await client.find({ id });
    return result;
  }

  static find = async (table: TableInstance, parkId: string) => {
    const result = await client.findForTable(table, { parkId });
    return result
  }

  static findPos = async (table: TableInstance, parkId: string) => {
    const params = { filter: { pos: true, parkId } };
    const result = await client.findForTable(table, params);
    return result;
  }

  static getPosSundries = async (parkId: string, search: string) => {
    const params = { 
      filter: { pos: true, parkId }, 
      page: { size: 10 } 
    };
    if (search) params.filter['q'] = { contains: search };
    const result = await client.find(params);
    return result;
  }

  static createOrUpdate = async (entity: SundriesPayload) => {
    const result = await client.createOrUpdate(entity);
    return result;
  }

  static getAll = async (parkId: string) => {
    const params = { filter: { parkId } };
    const result = await client.getAll(params);
    return result.entities
  }
}
