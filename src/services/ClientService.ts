import { makeGet } from './util';
import { ClientPayload, UserRolePayload } from './payloads/ClientPayload';

export class ClientService {
  static find = async () => {
    let entities: any[] = await makeGet('/api/v1/clients');
    console.log('clients:', entities);
    return entities;
  }

  static getAll = async () => {
    let entities: ClientPayload[] = await makeGet('/api/v1/clients');
    return entities;
  }

  static getUsers = async () => {
    let entities: UserRolePayload[] = await makeGet('/api/v1/user_roles?filter[resource_type]=Client');
    return entities;
  }

  static getByUser = async (userName: string) => {
    const query = `filter[user_name]=${userName}`;
    let entities: UserRolePayload[] = await makeGet(`/api/v1/user_roles?${query}`);
    return entities;
  }
}
