import { PayloadBase } from './PayloadBase';

export class CategoryPayload extends PayloadBase {
  id: string
  parkId: string
  name: string
  color: string
  active: boolean
  createdAt: string
  updatedAt: string
};

export const CategoryPayloadAttributes = Object.keys(CategoryPayload.new());
