import { TableInstance } from '../interfaces/TableInstance';
import { PaymentPayload } from 'services/payloads/PaymentPayload';
import { ax } from '../util';
import { JsonApiClient } from '../client/JsonApiClient';

const client = new JsonApiClient(PaymentPayload, ax, 'payments');

export class PaymentService {

  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result;
  }

  static applyAction = async (id: string, action: string) => {
    const result = await client.patch(id, { action } );
    return result;
  }

  static getByReservationId = async (reservationId: string) => {
    const params = {
      filter: { reservationId },
      include: 'refunds'
    };
    const result = await client.getAll(params);
    return result.entities;
  };

  static getByGuestId = async (guestId: string) => {
    const params = { filter: { guestId } };
    const result = await client.getAll(params);
    return result.entities;
  };

  static getByOrderId = async (orderId: string) => {
    const params = { filter: { orderId } };
    const result = await client.getAll(params);
    return result.entities;
  };

  static createOrUpdate = async (entity: PaymentPayload) => {
    const result = await client.createOrUpdate(entity);
    return result;
  }

  static delete = async (id: string) => {
    const result = await client.delete(id);
    return result;
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
