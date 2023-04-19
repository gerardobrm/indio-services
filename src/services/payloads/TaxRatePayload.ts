import { PayloadBase } from './PayloadBase';

export class TaxRatePayload extends PayloadBase {
  id: string
  taxTableId: string 
  glAccountId: string 
  name: string 
  percentage: number
  usePercentage: boolean;
  amount: number;
  stayOperator: string;
  stay: number;
  stayUnit: string;
  active: boolean 
}


export const TaxRatePayloadAttributes = Object.keys(TaxRatePayload.new());
