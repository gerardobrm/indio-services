import { PayloadBase } from './PayloadBase';

export class SundriesPayload extends PayloadBase {
  id: string
  parkId: string
  glAccountId: string
  sundryCategoryId: string
  sundryCategoryName: string
  taxTableId: string
  type: string
  sku: string
  barcode: string
  name: string
  description: string
  memo: string
  quantity: number
  unitPrice: number
  quantityEditable: boolean
  unitPriceEditable: boolean
  taxable: boolean
  refundable: boolean
  pos: boolean
  imageUrl: string
  imageDataUri: string
  imageMetadata: {}
  imageOriginalFilename: string
  createdAt: string
  updatedAt: string
};

export const SundriesAttributes = Object.keys(SundriesPayload.new());
