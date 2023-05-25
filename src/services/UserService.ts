import { TableInstance } from 'components/tables/ControlledTable';
import { UserPayload } from './payloads/UserPayload';
import { ax } from './util';
import { JsonApiClient } from './client/JsonApiClient';

const client = new JsonApiClient(UserPayload, ax, 'users');

export class UserService {
  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result;
  }

  static getByEmail = async (email: string) => {
    const params = { filter: { email } };
    const result = await client.find(params);
    return result && result[0];
  }

  static find = async (table: TableInstance) => {
    const params = { include: 'user_roles' };
    const result = await client.findForTable(table, params);
    return result;
  }

  static createOrUpdate = async (entity: UserPayload) => {
    const result = await client.createOrUpdate(entity);
    return result;
  }

}
