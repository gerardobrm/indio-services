import { TableInstance } from '../interfaces/TableInstance';
import { Serializer } from 'jsonapi-serializer';
import { PaymentPayload, PaymentPayloadAttributes } from 'services/payloads/PaymentPayload';
import { makeDelete, makeGet, makeGetForTable, makePatch, makePost } from '../util';

const serializer = new Serializer('payments', {
  attributes: PaymentPayloadAttributes,
  keyForAttribute: 'snake_case',
});

export class PaymentService {
  static getById = async (id: string) => {};

  static setPrimary = async (id: string) => {
    const payload = serializer.serialize({ id: id, primary: true });
    let data: PaymentPayload[] = await makePatch(`/api/v1/payments/${id}`, payload);
    return data;
  };

  static applyAction = async (id: string, action: string) => {
    const payload = serializer.serialize({ id, action });
    console.log(payload);
    let response: PaymentPayload = await makePatch(`/api/v1/payments/${id}`, payload);
    return response;
  };

  static getByReservationId = async (reservationId: string) => {
    const query = `filter[reservation_id]=${reservationId}&include=refunds`;
    let data: PaymentPayload[] = await makeGet(`/api/v1/payments?${query}`);
    return data;
  };

  static getByGuestId = async (guestId: string) => {
    let data: PaymentPayload[] = await makeGet(`/api/v1/payments?filter[guest_id]=${guestId}`);
    return data;
  };

  static getByOrderId = async (orderId: string) => {
    let data: PaymentPayload[] = await makeGet(`/api/v1/payments?filter[order_id]=${orderId}`);
    return data;
  };

  // static createOrUpdateCard = async (entity: PaymentPayload) => {
  //   const payload = serializer.serialize(entity);
  //   let result: PaymentPayload;
  //   if (entity.id) {
  //     result = await makePut<PaymentPayload>(`/api/v1/payments/${entity.id}`, payload);
  //   } else {
  //     result = await makePost<PaymentPayload>(`/api/v1/payments`, payload);
  //   }
  //   return result;
  // }

  static create = async (entity: Partial<PaymentPayload>) => {
    const payload = serializer.serialize(entity);
    await makePost<PaymentPayload>('/api/v1/payments', payload);
  };

  static delete = async (id: string) => {
    await makeDelete(`/api/v1/payments/${id}`);
  };

  static find = async (guestId: string, table: TableInstance) => {
    const query = `filter[guest_id]=${guestId}`;
    let entities = await makeGetForTable<PaymentPayload[]>('/api/v1/payments', query, table);
    return entities;
  };

  static getAll = async (guestId: string) => {
    const query = `filter[guest_id]=${guestId}`;
    let entities = await makeGet<PaymentPayload[]>(`/api/v1/payments?${query}`);
    return entities;
  };
}
