import { UniversalSiteTypesPayload } from 'services/payloads/UniversalSiteTypesPayload';
import { makeGet } from 'services/util';

export class UniversalTypesService {
  static getAll = async () => {
    let entities: UniversalSiteTypesPayload[] = await makeGet('/api/v1/universal_site_types');
    return entities;
  }
}
