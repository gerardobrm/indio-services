import { JsonApiClient } from './client/JsonApiClient';
import { ax } from './util';
import { ActivityLogPayload } from './payloads';

const client = new JsonApiClient(ActivityLogPayload, ax, 'activity_log_items');

export class ActivityLogService{
  static getAll = async (activityLoggableId: string) => {
    const params = {
      filter: { activity_loggable_id: activityLoggableId },
      sort: '-created_at',
    };
    const result = await client.find(params);
    return result;
  }

  static create = async (entity: Partial<ActivityLogPayload>) => {
    const payload = entity as ActivityLogPayload;
    const result = await client.createOrUpdate(payload);
    return result;
  }
}
