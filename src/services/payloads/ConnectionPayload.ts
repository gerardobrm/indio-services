export type ConnectionPayload = {
  id: string
  clientId: string
  active: boolean
  name: string
  code: string
  type: string
  description: string
  username: string
  password: string
  secondaryUsername: string
  secondaryPassword: string
  tokenExpiryDate: string
  metadata: ConnectionMetadata
}

type ConnectionMetadata = {
  allowedParks: {
      clientId: number
      clientName: string
  }[]
}

type Keys = keyof ConnectionPayload;
export const ConnectionPayloadAttributes: Keys[] = [
  'id', 'clientId', 'active', 'name', 'code', 'type', 'description', 'username', 'password', 'secondaryUsername', 'secondaryPassword'
];
