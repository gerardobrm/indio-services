import { TableInstance } from 'components/tables/ControlledTable';
import { Serializer } from 'jsonapi-serializer';
import { SundriesAttributes, SundriesPayload } from 'services/payloads/SundriesPayload';
import { makeGet, makeGetForTable, makePost, makePut } from '../util';

const serializer = new Serializer('sundries', {
  attributes:  SundriesAttributes, keyForAttribute: 'snake_case'
});

export class SundriesService {
  static getById = async (id: string) => {
    let entities: SundriesPayload[] = await makeGet(`/api/v1/sundries?${id}`);
    return entities;
  }

  static find = async (table: TableInstance, parkId: string) => {
    const query = `filter[park_id]=${parkId}`;
    let entities = await makeGetForTable<SundriesPayload[]>('/api/v1/sundries', query, table);
    return entities;
  }

  static findPos = async (table: TableInstance, parkId: string) => {
    const query = `filter[pos]=true&filter[park_id]=${parkId}`;
    let entities = await makeGetForTable<SundriesPayload[]>('/api/v1/sundries', query, table);
    return entities;
  }

  static getPosSundries = async (parkId: string, search: string) => {
    let query = `filter[pos]=true&filter[park_id]=${parkId}&page[size]=10`;
    if (search) {
      query += `&filter[q][contains]=${search}`;
    }
    let entities: SundriesPayload[] = await makeGet(`/api/v1/sundries?${query}`);
    return entities;
  }

  static createOrUpdate = async (entity: Partial<SundriesPayload>) => {
    const payload = serializer.serialize(entity);
    if (entity.id) {
      await makePut(`/api/v1/sundries/${entity.id}`, payload);
    } else {
      await makePost('/api/v1/sundries', payload);
    }
  }

  static getAll = async (parkId: string) => {
    const query = `filter[park_id]=${parkId}`;

    let entities: SundriesPayload[] = await makeGet(`/api/v1/sundries?${query}`);
    return entities;
  }
}
