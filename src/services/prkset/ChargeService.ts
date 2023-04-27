import { Serializer } from 'jsonapi-serializer';
import { ChargeAttributes, ChargePayload, ChargeRequest } from 'services/payloads/ChargePayload';
import { makeGet, makePut, makePost, makeDelete, makePatch } from '../util';

const serializer = new Serializer('charges', {
  attributes: ChargeAttributes,
  keyForAttribute: 'snake_case',
});

export class ChargeService {
  static getById = async (id: string) => {
    let entities: ChargePayload = await makeGet<ChargePayload>(`/api/v1/charges/${id}`);
    return entities;
  };

  static getByIds = async (ids: string[]) => {
    const query = `filter[id]=${ids.join(',')}`;
    let entities: ChargePayload[] = await makeGet<ChargePayload[]>(`/api/v1/charges?${query}`);
    return entities;
  };

  static getByOrderId = async (id: string) => {
    let entities = await makeGet<ChargePayload[]>(`/api/v1/charges?filter[order_id]=${id}&filter[sub_type]=Sundry`);
    return entities;
  };

  static create = async (entity: Partial<ChargePayload>, parkId: string) => {
    entity = {
      ...entity,
      parkId,
    };

    const payload = serializer.serialize(entity);
    let newEntity = await makePost<ChargePayload>('/api/v1/charges', payload);
    return newEntity;
  };

  static update = async (id: string, entity: ChargePayload) => {
    const payload = serializer.serialize(entity);
    await makePut(`/api/v1/charges/${id}`, payload);
  };

  static updatePartial = async (id: string, entity: Partial<ChargePayload>) => {
    const payload = serializer.serialize(entity);
    await makePatch(`/api/v1/charges/${id}`, payload);
  };

  static createOrUpdate = async (entity: ChargeRequest) => {
    const payload = serializer.serialize(entity);

    if (entity.id) {
      return await makePut<ChargePayload>(`/api/v1/charges/${entity.id}`, payload);
    } else {
      return await makePost<ChargePayload>('/api/v1/charges', payload);
    }
  };

  static createOrUpdateCart = async (entity: Partial<ChargePayload>, parkId: string) => {
    entity = {
      ...entity,
      parkId,
    };

    const payload = serializer.serialize(entity);
    console.log(`update carte ${payload}`);
    // if (entity.id) {
    //   await makePut(`/api/v1/charges/${entity.id}`, payload);
    // } else {
    //   await makePost('/api/v1/charges', payload);
    // }
  };

  static delete = async (id: string) => {
    await makeDelete(`/api/v1/charges/${id}`);
  };
}
