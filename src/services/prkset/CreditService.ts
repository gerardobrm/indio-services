import { ChargePayload } from 'services/payloads/ChargePayload';
import { JsonApiClient } from 'services/client/JsonApiClient';
import { ax } from '../util';

const client = new JsonApiClient(ChargePayload, ax, 'credits');
export class CreditService {

  static getByIds = async (ids: string[]) => {
    const params = { filter: { id: ids.join(',') } };
    const result = await client.find(params);
    return result;
  }

  static createOrUpdate = async (entity: ChargePayload) => {
    const result = await client.createOrUpdate(entity);
    return result;
  }
  
}
