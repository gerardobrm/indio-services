import { PayloadBase } from './PayloadBase';
// import { Role } from 'interfaces/Role';

export class ClientPayload extends PayloadBase {
  id: string
  name: string
  active: boolean 
}

export class UserRolePayload extends PayloadBase {
  id: string
  clientId: string
  clientName: string
  userId: string
  userName: string
  roleId: string
  // roleName: Role
}

export const ClientPayloadAttributes = Object.keys(ClientPayload.new());
