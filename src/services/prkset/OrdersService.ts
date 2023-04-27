import { TableInstance } from 'components/tables/ControlledTable';
import { Serializer } from 'jsonapi-serializer';
import { OrderPayloadAttributes, OrderPayload } from 'services/payloads/OrderPayload';
import { makeGetForTable, makeGet, makePatch, makePost, makePut } from '../util';

const serializer = new Serializer('orders', {
  attributes: OrderPayloadAttributes,
  keyForAttribute: 'snake_case',
});

export class OrdersService {
  static getById = async (id: string) => {
    let entity = await makeGet<OrderPayload>(`/api/v1/orders/${id}`);
    return entity;
  };

  static getByIds = async (ids: string[]) => {
    const query = `filter[id]=${ids.join(',')}`;
    let entities = await makeGet<OrderPayload[]>(`/api/v1/orders?${query}`);
    return entities;
  };

  static find = async (table: TableInstance, parkId: string) => {
    const query = `filter[park_id]=${parkId}&sort=-number`;
    let entities = await makeGetForTable<OrderPayload[]>('/api/v1/orders', query, table);
    return entities;
  };

  static checkBalance = async (id: string, action: string) => {
    const payload = serializer.serialize({ id, action });
    console.log('payload', payload);
    let response: OrderPayload = await makePatch(`/api/v1/orders/${id}`, payload);
    return response;
  };

  static updatePartial = async (id: string, entity: Partial<OrderPayload>) => {
    const payload = serializer.serialize(entity);
    await makePatch(`/api/v1/guests/${id}`, payload);
  }

  static createOrUpdate = async (entity: Partial<OrderPayload>) => {
    const payload = serializer.serialize(entity);
    let response: OrderPayload;
    if (entity.id) {
      response = await makePut(`/api/v1/orders/${entity.id}`, payload);
    } else {
      response = await makePost('/api/v1/orders', payload);
    }
    return response;
  };
}
