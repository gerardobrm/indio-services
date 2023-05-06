import { JsonApiClient } from 'services/client/JsonApiClient';
import { UniversalSiteTypesPayload } from 'services/payloads/UniversalSiteTypesPayload';
import { ax } from 'services/util';

const client = new JsonApiClient(UniversalSiteTypesPayload, ax, 'universal_site_types');

export class UniversalTypesService {

  static getAll = async () => {
    const result = await client.getAll();
    return result.entities
  }
}
