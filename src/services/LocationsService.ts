import { JsonApiClient } from './client/JsonApiClient';
import { TableInstance } from './interfaces/TableInstance';
import { ax } from './util';
import { LocationsPayload } from './payloads/LocationsPayload';

const client = new JsonApiClient(LocationsPayload, ax, 'locations');

export class LocationsService {
  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result;
  }

  static createOrUpdate = async (entity: LocationsPayload) => {
    const result = await client.createOrUpdate(entity);
    return result;
  }

  static find = async (table: TableInstance, parkId: string) => {
    const result = await client.findForTable(table, { parkId });
    return result;
  }

  static getAll = async (parkId: string) => {
    const params = {
      filter: { parkId },
    }
    const result = await client.getAll(params);
    return result.entities;
  }
}
