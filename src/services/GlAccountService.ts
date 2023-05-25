import { makeGet } from './util';

export class GlAccountService {
  static find = async (parkId: string) => {
    let entities: any[] = await makeGet(`/api/v1/gl_accounts?filter[park_id]=${parkId}`);
    return entities;
  }
}
