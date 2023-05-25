import { JsonApiClient } from 'services/client/JsonApiClient';
import { ax } from 'services/util';

class FontPayload {
  id: string;
  name: string;
  code: string;
}

const client = new JsonApiClient(FontPayload, ax, 'fonts')
export class LookupService {
  static getAll = async () => {
    const result = await client.getAll();
    return result.entities;
  }
}


