import { ax } from '../util';
import { JsonApiClient } from '../client/JsonApiClient';
import { TableInstance } from '../interfaces/TableInstance';
import { DiscountPayload } from '../payloads/DiscountPayload';

const client = new JsonApiClient(DiscountPayload, ax, 'discounts');
export class DiscountService {

  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result
  }

  static getByIds = async (ids: string[]) => {
    const params = { filter: { id: ids.join(',') }};
    const result = await client.find(params);
    return result
  }

  static createOrUpdate = async (entity: DiscountPayload) => {
    const result = await client.createOrUpdate(entity);
    return result
  }

  static delete = async (id: string) => {
    await client.delete(id);
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
  
}
