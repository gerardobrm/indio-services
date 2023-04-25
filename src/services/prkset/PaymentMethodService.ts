import { ax } from '../util';
import { TableInstance } from '../interfaces/TableInstance';
import { JsonApiClient } from '../client/JsonApiClient';
import { CardPaymentMethodPayload, PaymentMethodPayload } from '../payloads/PaymentMethodPayload';

const client = new JsonApiClient(PaymentMethodPayload, ax, 'payment_methods');

export class PaymentMethodService {

  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result;
  }

  static setPrimary = async (id: string) => {
    const result = await client.patch(id, { id, primary: true });
    return result
  }

  static getByGuestId = async (guestId: string) => {
    const params = { filter: { guestId } }
    const result = await client.find(params);
    return result
  }

  static createOrUpdateCard = async (entity: CardPaymentMethodPayload) => {
    const result = await client.createOrUpdate(entity)
    return result
  }

  static delete = async (id: string) => {
     await client.delete(id);
  }

  static find = async (guestId: string, table: TableInstance) => {
      const result = await client.findForTable(table, { guestId });
      return result
  }

  static getAll = async (guestId: string) => {
    const params = { filter: { guestId } };
    const result = await client.getAll(params);
    return result.entities
  }
}
