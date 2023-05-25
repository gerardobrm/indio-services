import { SiteHoldPayload } from './payloads/SiteHoldPayload';
import { ax } from './util';
import { JsonApiClient } from './client/JsonApiClient';

const client = new JsonApiClient(SiteHoldPayload, ax, 'site_holds');

export class SiteHoldService {
  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result
  }

  static createOrUpdate = async (entity: SiteHoldPayload) => {
    const result = await client.createOrUpdate(entity);
    return result;
  }

  static applyAction = async (id: string, action: string) => {
    const payload = { id, action };
    const result = await client.patch(id, payload);
    return result;
  }
}
