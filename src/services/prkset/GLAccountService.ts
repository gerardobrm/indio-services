import { JsonApiClient } from 'services/client/JsonApiClient';
import { GLAccountPayload } from 'services/payloads/GLAccountPayload';
import { ax } from 'services/util';

const client = new JsonApiClient(GLAccountPayload, ax, 'gl_accounts');

export class GlAccountService {

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
