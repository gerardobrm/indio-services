import { TableInstance } from 'components/tables/ControlledTable';
import { VehiclePayload } from './payloads/VehiclePayload';
import { ax } from './util';
import { JsonApiClient } from './client/JsonApiClient';

const client = new JsonApiClient(VehiclePayload, ax, 'vehicles');

export class VehicleService {
  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result;
  }

  static createOrUpdate = async (entity: VehiclePayload) => {
    const result = await client.createOrUpdate(entity);
    return result;
  }

  static find = async (guestId: string, table: TableInstance) => {
    const result = await client.findForTable(table, { guestId })
    return result;
  }

  static getAll = async (guestId: string) => {
    const result = await client.find({ guestId });
    return result;
  }
}
