import { Serializer } from 'jsonapi-serializer';
import { RefundAttributes, RefundPayload } from 'services/payloads/RefundPayload';
import { makePost } from '../util';

const serializer = new Serializer('refunds', {
  attributes: RefundAttributes, keyForAttribute: 'snake_case'
});

export class RefundService {
  static getById = async (id: string) => {
  }

  static create = async (entity: Partial<RefundPayload>) => {
    const payload = serializer.serialize(entity);
    await makePost('/api/v1/refunds', payload);
  }
}
