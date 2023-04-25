import { PayloadBase } from './PayloadBase';

export class PaymentMethodPayload extends PayloadBase {
  id: string
  guestId: string
  type: 'CardPaymentMethod' | 'CashPaymentMethod' | 'CheckPaymentMethod'
  primary: boolean
  active: boolean
  createdAt?: string
  updatedAt?: string
}

export class CardPaymentMethodPayload extends PaymentMethodPayload {
  type: 'CardPaymentMethod'
  cardId: string
  cardholderName: string
  cardNumber: string
  cvc: string
  cardType: string
  cardLast4: string
  expiry: string
  address: string
  address2: string
  address3: string
  address4: string
  city: string
  state: string
  postalCode: string
  country: string
  tokenized: boolean
  recordOnly: boolean

}

export class CashPaymentMethodPayload extends PaymentMethodPayload {
  type: 'CashPaymentMethod'
}

export class CheckPaymentMethodPayload extends PaymentMethodPayload {
  type: 'CheckPaymentMethod'
}

export const PaymentMethodPayloadAttributes = Object.keys(CardPaymentMethodPayload.new());
