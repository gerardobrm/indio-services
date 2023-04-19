export type UserPayload = {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  userRoles: UserRolePayload[];
}

type UserRolePayload = {
  id: string
  clientName: string
  roleName: string
  userName: string
}

type Keys = keyof UserPayload;
export const UserPayloadAttributes: Keys[] = [
  'id','email', 'firstName', 'middleName', 'lastName'
];
