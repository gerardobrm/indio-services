import { PayloadBase } from './PayloadBase';

export class PolicySettingPayload extends PayloadBase {
  id: string
  systemTerms: string
  cancellationPolicy: string
  refundPolicy: string
  petPolicy: string
  terms: string
  notes: string
  parkReminders: string
}
