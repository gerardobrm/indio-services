import { PayloadBase } from './PayloadBase';
export class OrderPayload extends PayloadBase {
  id: string;
  parkId: string;
  locationId: string;
  locationName: string;
  reservationId: string;
  creatorId?: string;
  creatorName?: string;
  number: number;
  subtotal: number;
  discountId: string;
  discountTotal: number;
  tax: number;
  total: number;
  status: string;
  balance: number;
  payedAmount: number;
  actions: string[];
  action: string;
  createdAt: string;
}

export const OrderPayloadAttributes = Object.keys(OrderPayload.new());
