import { Serializer } from 'jsonapi-serializer';
import { ChargeAttributes, ChargePayload } from 'services/payloads/ChargePayload';
import { makeGet, makePost, makePut } from '../util';

const serializer = new Serializer('credits', {
  attributes:  ChargeAttributes, keyForAttribute: 'snake_case'
});

export class CreditService {
  static getById = async (id: string) => {
  }

  static getByIds = async (ids: string[]) => {
    const query = `filter[id]=${ids.join(',')}`;
    let entities = await makeGet<ChargePayload[]>(`/api/v1/credits?${query}`);
    return entities;
  }

  static create = async (entity: any) => {
  }
  static update = async (id: number, entity: any) => {
  }

  static createOrUpdate = async (entity: Partial<ChargePayload>) => {
    const payload = serializer.serialize(entity);
    if (entity.id) {
      await makePut(`/api/v1/credits/${entity.id}`, payload);
    } else {
      await makePost('/api/v1/credits', payload);
    }
  }
}
