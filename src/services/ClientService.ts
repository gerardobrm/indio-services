import { JsonApiClient } from './client/JsonApiClient';
import { ax } from './util';
import { ClientPayload } from './payloads/ClientPayload';

const client = new JsonApiClient(ClientPayload, ax, 'clients');
const userRolesClient = new JsonApiClient(ClientPayload, ax, 'user_roles');

export class ClientService {
  static find = async () => {
    const result = await client.find();
    return result;
  }

  static getAll = async () => {
    const result = await client.getAll();
    return result.entities;
  }

  static getUsers = async () => {
    const params = { filter: { resource_type: 'Client' } };
    const result = await userRolesClient.find(params);
    return result;
  }

  static getByUser = async (userName: string) => {
    const params = { filter: { user_name: userName } };
    const result = await userRolesClient.find(params);
    return result;
  }
}
