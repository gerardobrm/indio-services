import { TableInstance } from './interfaces/TableInstance';
import { JsonApiClient } from './client/JsonApiClient';
import { PhotoService } from './PhotoService';
import { SiteTypePayload } from './payloads';
import { message } from 'antd';
import { ax } from './util';

const client = new JsonApiClient(SiteTypePayload, ax, 'site_types');

export class SiteTypeService {

  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result;
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
    const result = await client.createOrUpdate(entity);
    return result;
  }

  static find = async (parkId: string, table: TableInstance) => {
    const params = {
      filter: {park_id: parkId},
      include: 'primary_photo',
    }
    const result = await client.findForTable(table, params);
    return result
  }

  static getAll = async (search: string, parkId: string) => {
    const params = {
      filter: { parkId, q: { contains: search } },
      page: { size: 200 },
      sort: '-created_at',
    }
    const result = await client.getAll(params);
    return result.entities
  }
}
