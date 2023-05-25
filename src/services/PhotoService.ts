import { TableInstance } from 'components/tables/ControlledTable';
import { PhotoPayload } from './payloads/PhotoPayload';
import { JsonApiClient } from './client/JsonApiClient';
import { ax } from './util';

const client = new JsonApiClient(PhotoPayload, ax, 'photos');

export class PhotoService {
  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result;
  }

  static createOrUpdate = async (entity: PhotoPayload) => {
    const result = await client.createOrUpdate(entity);
    return result;
  }

  static find = async (table: TableInstance, tags: string[], parkId: string) => {
    const params = { filter: { parkId } };
    if (tags && tags.length > 0) {
      const values = tags.map(tag => `"${tag}"`).join(',');
      params.filter['tagNames'] = { matchAny: `[${values}]` };
    }
    table.setters.setSorting({ field: 'created_at', order: 'descend' });
    const result = await client.findForTable(table, { parkId });
    return result;
  }

}
