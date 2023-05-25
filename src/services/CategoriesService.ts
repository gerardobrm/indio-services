import { TableInstance } from 'components/tables/ControlledTable';
import { ax } from './util';
import { CategoryPayload } from './payloads/CategoryPayload';
import { JsonApiClient } from './client/JsonApiClient';

const client = new JsonApiClient(CategoryPayload, ax, 'sundry_categories');

export class CategoriesService {
  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result;
  }

  static createOrUpdate = async (entity: CategoryPayload) => {
    const result = await client.createOrUpdate(entity);
    return result;
  }

  static find = async (table: TableInstance, parkId: string) => {
    const result = await client.findForTable(table, { parkId });
    return result;
  }

  static getAll = async (parkId: string) => {
    const params = { filter: { parkId } };
    const result = await client.getAll(params);
    return result.entities;
  };

  static delete = async (id: string) => {
    await client.delete(id);
  }
}