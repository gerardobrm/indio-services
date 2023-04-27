import { TableInstance } from 'components/tables/ControlledTable';
import { OrderPayload } from 'services/payloads/OrderPayload';
import { makePatch, ax } from '../util';
import { JsonApiClient } from 'services/client/JsonApiClient';

const client = new JsonApiClient(OrderPayload, ax, 'orders');
export class OrdersService {

  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result
  }

  static getByIds = async (ids: string[]) => {
    const params = { filter: { id: ids.join(',') }};
    const result = await client.find(params);
    return result
  }

  static find = async (table: TableInstance, parkId: string) => {
    const params = { filter: { parkId, sort: '-number'} };
    const result = await client.findForTable(table, params);
    return result
  };

  static checkBalance = async (id: string, action: string) => {
    const result = await client.patch(id, { id, action });
    return result
  };

  static updatePartial = async (id: string, entity: Partial<OrderPayload>) => {
    const payload = serializer.serialize(entity);
    await makePatch(`/api/v1/guests/${id}`, payload);
  }

  static createOrUpdate = async (entity: OrderPayload) => {
    const result = await client.createOrUpdate(entity);
    return result
  }
}
