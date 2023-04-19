import { TableInstance } from '../interfaces/TableInstance';
import { Serializer } from 'jsonapi-serializer';
import { CardPaymentMethodPayload, PaymentMethodPayload, PaymentMethodPayloadAttributes } from 'services/payloads/PaymentMethodPayload';
import { makeDelete, makeGet, makeGetForTable, makePatch, makePost, makePut } from '../util';

const serializer = new Serializer('payment_methods', {
  attributes: PaymentMethodPayloadAttributes, keyForAttribute: 'snake_case'
});

export class PaymentMethodService {
  static getById = async (id: string) => {
  }

  static setPrimary = async (id: string) => {
    const payload = serializer.serialize({ id: id, primary: true });
    let data: PaymentMethodPayload[] = await makePatch(`/api/v1/payment_methods/${id}`, payload);
    return data;
  }

  static getByGuestId = async (guestId: string) => {
    let data: PaymentMethodPayload[] = await makeGet(`/api/v1/payment_methods?filter[guest_id]=${guestId}`);
    return data;
  }

  static createOrUpdateCard = async (entity: CardPaymentMethodPayload) => {
    const payload = serializer.serialize(entity);
    let result: PaymentMethodPayload;
    if (entity.id) {
      result = await makePut<PaymentMethodPayload>(`/api/v1/payment_methods/${entity.id}`, payload);
    } else {
      result = await makePost<PaymentMethodPayload>('/api/v1/payment_methods', payload);
    }
    return result;
  }

  static delete = async (id: string) => {
    await makeDelete(`/api/v1/payment_methods/${id}`);
  }

  static find = async (guestId: string, table: TableInstance) => {
    const query = `filter[guest_id]=${guestId}`;
    let entities = await makeGetForTable<PaymentMethodPayload[]>('/api/v1/payment_methods', query, table);
    return entities;
  }

  static getAll = async (guestId: string) => {
    const query = `filter[guest_id]=${guestId}`;
    let entities = await makeGet<PaymentMethodPayload[]>(`/api/v1/payment_methods?${query}`);
    return entities;
  }
}
