import { ax, makeDelete, makeGetForTable, makeGet, makePut, makePost } from './util';
import { JsonApiClient } from './client/JsonApiClient';
import { TableInstance } from './interfaces/TableInstance';
import { DiscountPayload } from './payloads/DiscountPayload';

const client = new JsonApiClient(DiscountPayload, ax, 'discounts');

export class DiscountService {
  static getById = async (id: string) => this.getByIds([id]);

  static getByIds = async (ids: string[]) => {
    const query = `filter[id]=${ids.join(',')}`;
    let entities = await makeGet<DiscountPayload[]>(`/api/v1/discounts?${query}`);
    return entities;
  }

  static createOrUpdate = async (entity: DiscountPayload) => {
    const payload = client.createOrUpdate(entity);
    if (entity.id) {
      await makePut(`/api/v1/discounts/${entity.id}`, payload);
    } else {
      await makePost('/api/v1/discounts', payload);
    }
  }

  static delete = async (id: string) => await makeDelete(`/api/v1/discounts/${id}`);

  static find = async (parkId: string, table: TableInstance) => {
    const query = `filter[park_id]=${parkId}`;
    let entities = await makeGetForTable<DiscountPayload[]>('/api/v1/discounts', query, table);
    return entities;
  }

  static getAll = async (parkId: string) => {
    const query = `filter[park_id]=${parkId}&page[size]=200`;
    let entities: DiscountPayload[] = await makeGet(`/api/v1/discounts?${query}`);
    return entities;
  }
  
}
