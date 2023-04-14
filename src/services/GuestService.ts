import { JsonApiClient } from './client/JsonApiClient';
import { TableInstance } from './interfaces/TableInstance';
import { GuestPayload } from './payloads';
import { PaymentMethodPayload } from './payloads/PaymentMethodPayload';
import { ax, makeGet } from './util';

const client = new JsonApiClient(GuestPayload, ax, 'guests');

export class GuestService {
  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result;
  }

  static getPaymentMethods = async (guestId: string) => {
    let data: PaymentMethodPayload[] = await makeGet(`/api/v1/payment_methods?filter[guest_id]=${guestId}`);
    return data;
  }

  static getByIdExtra = async (id: string) => {
    const extra = 'outstanding_balance,lifetime_spent,most_recent_reservation';
    const params = {
      extra_fields: { guests: extra }
    }
    const result = await client.getById(id, params);
    return result;
  }

  static createOrUpdate = async (entity: GuestPayload) => {
    const result = await client.createOrUpdate(entity);
    return result;
  }

  static updatePartial = async (id: string, entity: Partial<GuestPayload>) => {
    const result = await client.updatePartial(id, entity);
    return result;
  }

  static find = async (table: TableInstance, parkId: string) => {
    if (!table.sorting) {
      table.setters.setSorting({field: 'created_at', order: 'descend'});
    }
    const result = await client.findForTable(table, { parkId });
    return result;
  }

  static getAll = async (search: string, parkId: string) => {
    const params = {
      filter: { parkId, q: { contains: search } },
      page: { number: 1, size: 15 },
      sort: '-created_at',
    }
    const result = await client.getAll(params);
    return result.entities;
  }
}
