import { TableInstance } from '../interfaces/TableInstance';
import { Serializer } from 'jsonapi-serializer';
import { DiscountPayload, DiscountAttributes } from '../payloads/DiscountPayload';
import { makeGetForTable, makeGet, makePut, makePost, makeDelete } from '../util';

const serializer = new Serializer('discounts', {
  attributes: DiscountAttributes, keyForAttribute: 'snake_case'
});

export class DiscountService {
  static getById = async (id: string) => {
    DiscountService.getByIds([id]);
  }

  static getByIds = async (ids: string[]) => {
    const query = `filter[id]=${ids.join(',')}`;
    let entities = await makeGet<DiscountPayload[]>(`/api/v1/discounts?${query}`);
    return entities;
  }

  static create = async (entity: any) => {
  }
  static update = async (id: number, entity: any) => {
  }

  static delete = async (id: string) => {
    await makeDelete(`/api/v1/discounts/${id}`);
  }

  static createOrUpdate = async (entity: DiscountPayload) => {
    const payload = serializer.serialize(entity);
    if (entity.id) {
      await makePut(`/api/v1/discounts/${entity.id}`, payload);
    } else {
      await makePost('/api/v1/discounts', payload);
    }
  }

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
