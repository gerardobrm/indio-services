import { PayloadBase } from './PayloadBase';

export class RefundPayload extends PayloadBase {
  id: string
  creatorId: string
  paymentId: string
  reservationId?: string
  guestId: string
  parkId?: string
  creatorName: string
  type: string
  subType: string
  date?: string
  description: string
  memo: string
  amount: number
  quantity?: number
  credit: number
  debit: number
  total: number
  status: string
  actions: string[]
  createdAt: string
  updatedAt: string
};

export const RefundAttributes = Object.keys(RefundPayload.new());
