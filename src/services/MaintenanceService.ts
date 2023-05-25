import { TableInstance } from './interfaces/TableInstance';
import { SitePayload } from './payloads/SitePayload';
import { ax } from './util';
import { JsonApiClient } from './client/JsonApiClient';

const client = new JsonApiClient(SitePayload, ax, 'sites');
export class MaintenanceService {
  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result;
  }

  static createOrUpdate = async (entity: SitePayload) => {
    const result = await client.createOrUpdate(entity);
    return result;
  }

  static find = async (table: TableInstance, parkId: string) => {
    const params = {
      filter: { parkId, sort: '-task_list,updated_at' }
    }
    const result = await client.findForTable(table, params);
    return result;
  }

  static getTasks = async (table: TableInstance, parkId: string) => {
    const params = {
      filter: { parkId, hasTasks: true }
    }
    const result = await client.findForTable(table, params);
    return result;
  }
}
