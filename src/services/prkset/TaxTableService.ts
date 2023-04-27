import { JsonApiClient } from 'services/client/JsonApiClient';
import { TaxTablePayload } from 'services/payloads/TaxTablePayload';
import { ax } from 'services/util';

const client = new JsonApiClient(TaxTablePayload, ax, 'tax_tables');
export class TaxTableService {

  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result
  }

  static getAll = async (parkId: string) => {
    const params = { filter: { parkId } };
    const result = await client.getAll(params);
    return result.entities;
  }
}
