import { TableInstance } from './interfaces/TableInstance';
import { SitePayload, SitePayloadAttributes } from './payloads/SitePayload';
import { Serializer } from 'jsonapi-serializer';
import { makeGetForTable, makePut } from './util';

const serializer = new Serializer('sites', {
  attributes: SitePayloadAttributes, keyForAttribute: 'snake_case'
});

export class MaintenanceService {
  static update = async (entity: Partial<SitePayload>) => {
    const payload = serializer.serialize(entity);
    await makePut(`/api/v1/sites/${entity.id}`, payload);
  }

  static find = async (table: TableInstance, parkId: string) => {
    const query = `filter[park_id]=${parkId}&sort=-task_list,updated_at`;
    let entities: SitePayload[] = await makeGetForTable('/api/v1/sites', query, table);
    return entities;
  }

  static getTasks = async (table: TableInstance, parkId: string) => {
    const query = `filter[park_id]=${parkId}&filter[has_tasks]=true`;
    let entities: SitePayload[] = await makeGetForTable('/api/v1/sites', query, table);
    return entities;
  }
}
