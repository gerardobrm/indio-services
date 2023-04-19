import { PayloadBase } from './PayloadBase';

export class TransactionPayload extends PayloadBase {
  id: string;
  parkId: string;
  reservationId: string;
  orderId: string;
  glAccountId: string;
  creatorId: string;
  cardId?: string;
  cardType?: string;
  cardLast4?: string;
  type: string;
  subType: string;
  paymentMethodId: string;
  number: string;
  date: string;
  description: string;
  memo: string;
  amount: number;
  quantity: number;
  unitPrice: number;
  credit: number;
  debit: number;
  total: number;
  taxable: boolean;
  refundable: boolean;
  createdAt: string;
  updatedAt: string;
  guestId: string;
  action: string;
  actions: string[];
};

export const TransactionAttributes = Object.keys(TransactionPayload.new());
