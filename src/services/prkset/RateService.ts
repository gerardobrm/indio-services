import { TableInstance } from '../interfaces/TableInstance';
import { Serializer } from 'jsonapi-serializer';
import { RatePayload, RateAttributes } from '../payloads/RatePayload';
import { makeGetForTable, makeGet, makePut, makePost } from '../util';

const serializer = new Serializer('rates', {
  attributes: RateAttributes, keyForAttribute: 'snake_case'
});

export class RateService {
  static getById = async (id: string) => {
    let entities: RatePayload = await makeGet(`/api/v1/rates/${id}`);
    return entities;
  }

  static create = async (entity: RatePayload) => {
  }

  static update = async (id: string, entity: RatePayload) => {
  }

  static createOrUpdate = async (entity: RatePayload) => {
    const payload = serializer.serialize(entity);
    if (entity.id) {
      await makePut(`/api/v1/rates/${entity.id}`, payload);
    } else {
      await makePost('/api/v1/rates', payload);
    }
  }

  static find = async (parkId: string, table: TableInstance) => {
    const query = `filter[park_id]=${parkId}`;
    let entities = await makeGetForTable<RatePayload[]>('/api/v1/rates', query, table);
    return entities;
  }

  static getAll = async (parkId: string) => {
    const query = `filter[park_id]=${parkId}&page[size]=200`;
    let entities: RatePayload[] = await makeGet(`/api/v1/rates?${query}`);
    return entities;
  }
  
  static getBySiteTypeId = async (siteTypeId: string, activeOnly: boolean) => {
    const activeOnlyFilter = activeOnly ? '&filter[active]=true' : ''
    const query = `filter[site_type_id]=${siteTypeId}${activeOnlyFilter}&include=discounts`;
    let entities: RatePayload[] = await makeGet(`/api/v1/rates?${query}`);
    return entities;
  }
}
