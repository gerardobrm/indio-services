import { PayloadBase } from './PayloadBase';
import { RefundPayload } from './RefundPayload';

export class PaymentPayload extends PayloadBase {
  id: string
  parkId: string
  reservationId: string
  paymentMethodId: string
  orderId?: string
  description?: string
  memo?: string
    cardholderName?: string // TODO: group credit-card fields
    cardType?: string
    cardLast4?: string
    expiry?: string
    expiryDate?: string
    expiryMonth?: string
    expiryYear?: string
    address?: string
    address2?: string
    address3?: string
    address4?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
    tokenized?: boolean
    checkNumber?: string
  amount: number
  actions?: Action[]
  action?: string
  status?: string
    cardNumber?: number
    cvc?: string
  type?: string
  subType?: string
  date?: string
  refunds?: RefundPayload[]
  createdAt?: string
  updatedAt?: string
}

export type Action = 'void' | 'refund_payment' | 'revert';

export const PaymentPayloadAttributes = Object.keys(PaymentPayload.new());
