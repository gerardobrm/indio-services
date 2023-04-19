import { PayloadBase } from './PayloadBase';

export class ChargePayload extends PayloadBase {
  id: string;
  parkId: string;
  accountId?: string;
  reservationId?: string;
  orderId?: string;
  sundryId: string;
  description: string;
  memo?: string;
  unitPrice: number;
  amount?: number;
  quantity: number;
  total: number;
  status: string;
  action: string;
}

export const ChargeAttributes = Object.keys(ChargePayload.new());
