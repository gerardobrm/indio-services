import { TableInstance } from './interfaces/TableInstance';
import { Serializer } from 'jsonapi-serializer';
import { GuestPayload, GuestCreatePayloadAttributes } from './payloads';
import { PaymentMethodPayload } from './payloads/PaymentMethodPayload';
import { makeGet, makeGetForTable, makePatch, makePost, makePut } from './util';

const serializer = new Serializer('guests', {
  attributes: GuestCreatePayloadAttributes, keyForAttribute: 'snake_case'
});

export class GuestService {
  static getById = async (id: string) => {
    let entity: GuestPayload = await makeGet(`/api/v1/guests/${id}`);
    return entity;
  }
  
  static getPaymentMethods = async (guestId: string) => {
    let data: PaymentMethodPayload[] = await makeGet(`/api/v1/payment_methods?filter[guest_id]=${guestId}`);
    return data;
  }

  static getByIdExtra = async (guestId: string) => {
    const extra = 'outstanding_balance,lifetime_spent,most_recent_reservation';
    let data: GuestPayload = await makeGet(`/api/v1/guests/${guestId}?extra_fields[guests]=${extra}`);
    return data;
  }

  static create = async (entity: GuestPayload) => {
    const payload = serializer.serialize(entity);
    await makePost('/api/v1/guests', payload);
  }

  static createOrUpdate = async (entity: GuestPayload) => {
    const payload = serializer.serialize(entity);
    if (entity.id) {
      return await makePut<GuestPayload>(`/api/v1/guests/${entity.id}`, payload);
    } else {
      return await makePost<GuestPayload>('/api/v1/guests', payload);
    }
  }

  static update = async (id: string, entity: GuestPayload) => {
    const payload = serializer.serialize(entity);
    await makePut(`/api/v1/guests/${id}`, payload);
  }

  static updatePartial = async (id: string, entity: Partial<GuestPayload>) => {
    const payload = serializer.serialize(entity);
    await makePatch(`/api/v1/guests/${id}`, payload);
  }

  static find = async (table: TableInstance, parkId: string) => {
    const query = `filter[park_id]=${parkId}`;
    if (!table.sorting) {
      table.setters.setSorting({field: 'created_at', order: 'descend'});
    }
    let entities: GuestPayload[] = await makeGetForTable('/api/v1/guests', query, table);
    return entities;
  }

  static getAll = async (search: string, parkId: string) => {
    let query = `filter[park_id]=${parkId}&page[number]=1&page[size]=15&sort=-created_at`;
    if (search) {
      query = `filter[q][contains]=${search}&` + query;
    }
    let entities: GuestPayload[] = await makeGet(`/api/v1/guests?${query}`);
    return entities;
  }
}
