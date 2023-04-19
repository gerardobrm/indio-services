export type CredentialsPayload = {
  id: string;
  email: string;
  password: string;
  token: string;
  createdAt: string;
  updatedAt: string;
};

type Keys = keyof CredentialsPayload;
export const CredentialsPayloadAttributes: Keys[] = [
  'email', 'password'
];
