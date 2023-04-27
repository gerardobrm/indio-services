import { TransactionPayload } from 'services/payloads/TransactionsPayload';
import { JsonApiClient } from 'services/client/JsonApiClient';
import { ax } from '../util';

const client = new JsonApiClient(TransactionPayload, ax, 'transactions');
export class TransactionService {

  static getByReservationId = async (reservationId: string) => {
    const params = { filter: { reservationId, type: 'Charge,Credit' } };
    const result = await client.find(params);
    return result;
  };

  static getByOrderId = async (orderId: string) => {
    const params = { filter: { orderId, type: 'Refund,Payment' } };
    const result = await client.find(params);
    return result;
  };

  static applyAction = async (id: string, action: string) => {
    await client.patch(id, { id, action });
  }
}
