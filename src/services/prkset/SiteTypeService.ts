import { message } from 'antd';
import { TableInstance } from '../interfaces/TableInstance';
import { Serializer } from 'jsonapi-serializer';
import { SiteTypePayload, SiteTypePayloadAttributes } from '../payloads/SiteTypePayload';
import { PhotoService } from '../PhotoService';
import { makeGet, makeGetForTable, makePost, makePut } from '../util';

const serializer = new Serializer('site_types', {
  attributes: SiteTypePayloadAttributes, keyForAttribute: 'snake_case'
});

export class SiteTypeService {
  static getById = async (id: string) => {
    let entity: SiteTypePayload = await makeGet(`/api/v1/site_types/${id}`);
    return entity;
  }

  static createOrUpdate = async (entity: SiteTypePayload) => {
    if (entity.primaryPhoto?.fileDataUri) {
      const photo = await PhotoService.create(entity.primaryPhoto);
      if (photo) {
        entity.primaryPhotoId = photo.id;
      } else {
        message.error('An error occurred saving Photo');
      }
    }
    const payload = serializer.serialize(entity);
    if (entity.id) {
      await makePut(`/api/v1/site_types/${entity.id}`, payload);
    } else {
      await makePost('/api/v1/site_types', payload);
    }
  }

  static find = async (parkId: string, table: TableInstance) => {
    const query = `filter[park_id]=${parkId}&include=primary_photo`;
    let entities = await makeGetForTable<SiteTypePayload[]>('/api/v1/site_types', query, table);
    return entities;
  }

  static getAll = async (parkId: string) => {
    const query = `filter[park_id]=${parkId}&page[size]=200`;
    let entities: SiteTypePayload[]= await makeGet(`/api/v1/site_types?${query}`);
    return entities;
  }
}
