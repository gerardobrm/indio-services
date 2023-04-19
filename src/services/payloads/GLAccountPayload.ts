import { PayloadBase } from './PayloadBase';

export class GLAccountPayload extends PayloadBase {
  id: string;
  parkId: string;
  glgroupingId: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
};
