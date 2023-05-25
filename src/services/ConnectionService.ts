import { TableInstance } from 'components/tables/ControlledTable';
import { ConnectionPayload } from './payloads/ConnectionPayload';
import { ax } from './util';
import { JsonApiClient } from './client/JsonApiClient';

const client = new JsonApiClient(ConnectionPayload, ax, 'connections')

export class ConnectionService {
  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result;
  }

  static createOrUpdate = async (entity: ConnectionPayload) => {
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
