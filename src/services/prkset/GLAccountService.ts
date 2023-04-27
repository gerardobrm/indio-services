import { GLAccountPayload } from 'services/payloads/GLAccountPayload';
import { makeGet } from 'services/util';

export class GlAccountService {
  static getById = async (id: string) => {
    let entities: GLAccountPayload = await makeGet(`/api/v1/gl_accounts/${id}`);
    return entities;
  }

  static getAll = async (parkId: string) => {
    const query = `filter[park_id]=${parkId}`;
    let entities: GLAccountPayload[] = await makeGet(`/api/v1/gl_accounts?${query}`);
    return entities;
  }
}
