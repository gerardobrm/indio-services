import { Serializer } from 'jsonapi-serializer';
import { TransactionAttributes, TransactionPayload } from 'services/payloads/TransactionsPayload';
import { makeGet, makePatch } from '../util';

const serializer = new Serializer('transactions', {
  attributes: TransactionAttributes, keyForAttribute: 'snake_case'
});

export class TransactionService {
  static getById = async (id: string) => {
  }

  static getByReservationId = async (reservationId: string) => {
    const query = `/api/v1/transactions?filter[reservation_id]=${reservationId}&filter[type]=Charge,Credit`;
    let data: TransactionPayload[] = await makeGet(query);
    return data;
  };

  static getByOrderId = async (orderId: string) => {
    let data: TransactionPayload[] = await makeGet(
      `/api/v1/transactions?filter[order_id]=${orderId}&filter[type]=Refund,Payment`
    );
    return data;
  };

  static create = async (entity: any) => {
  }
  static update = async (id: number, entity: any) => {
  }

  static applyAction = async (id: string, action: string) => {
    const payload = serializer.serialize({ id, action });
    await makePatch(`/api/v1/transactions/${id}`, payload);
  }
}
