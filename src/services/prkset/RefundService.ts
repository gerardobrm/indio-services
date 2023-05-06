import { RefundPayload } from 'services/payloads/RefundPayload';
import { ax } from '../util';
import { JsonApiClient } from 'services/client/JsonApiClient';

const client = new JsonApiClient(RefundPayload, ax, 'refunds')

export class RefundService {

  static create = async (entity: RefundPayload) => {
    const result = await client.createOrUpdate(entity);
    return result
  }

}
