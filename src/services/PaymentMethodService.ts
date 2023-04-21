import { ax } from './util';
import { TableInstance } from './interfaces/TableInstance';
import { JsonApiClient } from './client/JsonApiClient';
import { CardPaymentMethodPayload, PaymentMethodPayload } from './payloads/PaymentMethodPayload';

const client = new JsonApiClient(PaymentMethodPayload, ax, 'payment_methods');

export class PaymentMethodService {

  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result;
  }

  static setPrimary = async (id: string) => {
    const result = await client.patch(id, {id: id, primary: true});
    return result
  }

  static getByGuestId = async (guestId: string) => {
    const params = { filter: {guest_id: guestId} }
    const result = await client.getAll(params);
    return result.entities
  }

  static createOrUpdateCard = async (entity: CardPaymentMethodPayload) => {
    const result = await client.createOrUpdate(entity)
    return result
  }

  static delete = async (id: string) => {
    const result = await client.delete(id)
    return result
  }

  static find = async (guestId: string, table: TableInstance) => {
      if (!table.sorting) {
        table.setters.setSorting({ field: 'created_at', order: 'descend' });
      }
      const result = await client.findForTable(table, { guestId });
      return result
  }

  static getAll = async (search: string, guestId: string) => {
    const params = {
      filter: { guestId, q: { contains: search } },
      page: { number: 1, size: 15 },
      sort: '-created_at',
    }
    const result = await client.getAll(params);
    return result.entities
  }
}
