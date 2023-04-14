import { TableInstance } from './interfaces/TableInstance';
import { Serializer } from 'jsonapi-serializer';
import { makeGet, makeGetForTable, makePost, makePut } from './util';
import { LocationsPayload, LocationsPayloadAttributes } from './payloads/LocationsPayload';

const serializer = new Serializer('locations', {
  attributes: LocationsPayloadAttributes, keyForAttribute: 'snake_case'
});

export class LocationsService {
  static getById = async (id: string) => {
    let entities: LocationsPayload = await makeGet(`/api/v1/locations/${id}`);
    return entities;
  }

  static create = async (entity: LocationsPayload) => {
  }

  static update = async (id: string, entity: LocationsPayload) => {
  }

  static createOrUpdate = async (entity: LocationsPayload) => {
    const payload = serializer.serialize(entity);
    if (entity.id) {
      await makePut(`/api/v1/locations/${entity.id}`, payload);
    } else {
      await makePost('/api/v1/locations', payload);
    }
  }

  static find = async (table: TableInstance, parkId: string) => {
    const query = `filter[park_id]=${parkId}`;
    let entities = await makeGetForTable<LocationsPayload[]>('/api/v1/locations', query, table);
    return entities;
  }

  static getAll = async (parkId: string) => {
    const query = `filter[park_id]=${parkId}`;
    let entities: LocationsPayload[] = await makeGet(`/api/v1/locations?${query}`);
    return entities;
  }
}
