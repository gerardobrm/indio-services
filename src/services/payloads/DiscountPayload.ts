import { PayloadBase } from './PayloadBase';

export class DiscountPayload extends PayloadBase{
  id: string
  parkId: string
  type: DiscountType
  name: string
  code: string
  loyaltyNumberLabel: string
  description: string
  usePercentage: boolean
  percentage: number
  amount: number
  // amountCents: null
  amountCurrency: string
  active: boolean
  createdAt: string
  updatedAt: string
};

export const DiscountTypeValues = ['regular', 'code', 'loyalty'] as const;
export type DiscountType = typeof DiscountTypeValues[number];

export const DiscountAttributes = Object.keys(DiscountPayload.new());
