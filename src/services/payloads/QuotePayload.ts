import { PayloadBase } from './PayloadBase';
import { RateDetailInfo } from 'interfaces/RateDetailInfo';

export class QuotePayload extends PayloadBase {
  id: string;
  siteTypeId: string;
  rateId: string;
  discountId: string;
  arrivalDate: string;
  departureDate: string;
  // chargeSiteLock: boolean;
  adults: number;
  children: number;
  pets: number;
  rateOverride: number;
  rateType: string;
  rateStrategy: string;
}

export class QuoteResponse {
  id: string;
  label: string;
  rate: number;
  rateDetail: RateDetailInfo;
  numberOfNights: number;
  subtotal: number;
  tax: number;
  taxDetail: TaxDetail[];
  total: number;
  transactionFee: number;
  deposit: number;
  depositDetail: DepositDetail[];
  discount: number;
  createdAt: string;
}

export type TaxDetail = {
  // type: string;
  // code: string;
  glAccountId: string;
  label: string;
  description: string;
  memo: string;
  amount: number;
  taxRate: number;
}

export type DepositDetail = {
  ruleId: string;
  description: string;
  amount_cents: number;
  amount: number;
  success: boolean;
  createdAt: string;
}
