import { ax } from '../util';
import { JsonApiClient } from '../client/JsonApiClient';
import { TableInstance } from '../interfaces/TableInstance';
import { DiscountPayload } from '../payloads/DiscountPayload';

const client = new JsonApiClient(DiscountPayload, ax, 'discounts');
export class DiscountService {

  static getById = async (id: string) => {
    const result = client.getById(id);
    return result
  }

  static getByIds = async (ids: string[]) => {
    const params = {
      filter: { id: ids.join(',') },
    };
    const result = await client.getAll(params);
    return result.entities
  }

  static createOrUpdate = async (entity: DiscountPayload) => {
    const result = client.createOrUpdate(entity);
    return result
  }

  static delete = async (id: string) => {
    const result = client.delete(id);
    return result
  }

  static find = async (parkId: string, table: TableInstance) => {
    if (!table.sorting) {
      table.setters.setSorting({ field: 'created_at', order: 'descend' });
    }
    const result = await client.findForTable(table, { parkId });
    return result
  }

  static getAll = async (search: string, parkId: string) => {
    const params = {
      filter: { parkId, q: { contains: search } },
      page: { number: 1, size: 200 },
      sort: '-created_at',
    }
    const result = await client.getAll(params);
    return result.entities
  }
  
}
