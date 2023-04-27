import { ChargePayload } from 'services/payloads/ChargePayload';
import { JsonApiClient } from 'services/client/JsonApiClient';
import { ax } from '../util';

const client = new JsonApiClient(ChargePayload, ax, 'charges')
export class ChargeService {

  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result;
  }

  static getByIds = async (ids: string[]) => {
    const params = { filter: { id: ids.join(',') } };
    const result = await client.find(params);
    return result;
  }

  static getByOrderId = async (orderId: string) => {
    const params = { filter: { orderId, subType: 'Sundry' } };
    const result = await client.find(params);
    return result
  };

  static createOrUpdate = async (entity: ChargePayload) => {
    const result = await client.createOrUpdate(entity);
    return result
  }

  static updatePartial = async (id: string, entity: Partial<ChargePayload>) => {
    const result = await client.updatePartial(id, entity);
    return result;
  }

  static delete = async (id: string) => {
    await client.delete(id)
  };
}
