import { TableInstance } from '../interfaces/TableInstance';
import { RatePayload } from '../payloads/RatePayload';
import { JsonApiClient } from '../client/JsonApiClient';
import { ax } from '../util';

const client = new JsonApiClient(RatePayload, ax, 'rates');

export class RateService {

  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result;
  }

  static createOrUpdate = async (entity: RatePayload) => {
    const result = await client.createOrUpdate(entity);
    return result;
  }

  static find = async (parkId: string, table: TableInstance) => {
    const result = await client.findForTable(table, { parkId });
    return result
  }

  static getAll = async (parkId: string) => {
    const params = {
      filter: { parkId },
      page: { size: 200 },
    }
    const result = await client.getAll(params);
    return result.entities
  }
  
  static getBySiteTypeId = async (siteTypeId: string, activeOnly: boolean) => {
    const params = {
      filter: { siteTypeId },
      include: 'discounts'
    };
    if (activeOnly) {
      params.filter['active'] = true;
    }
    const result = await client.find(params);
    return result;
  };
  
}
