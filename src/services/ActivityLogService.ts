import { makeGet, makePost } from './util';
import { ActivityLogPayload, ActivityLogPayloadAttributes } from './payloads';
import { Serializer } from 'jsonapi-serializer';

const serializer = new Serializer('activity_log_items', {
  attributes: ActivityLogPayloadAttributes, keyForAttribute: 'snake_case'
});

export class ActivityLogService{
  static getAll = async (activityLoggableId: string) => {
    const query = `sort=-created_at&filter[activity_loggable_id]=${activityLoggableId}`
    const data: ActivityLogPayload[] = await makeGet(`/api/v1/activity_log_items?${query}`);
    return data;
  }

  static create = async (entity: Partial<ActivityLogPayload>) => {
    const payload = serializer.serialize(entity);
    await makePost('/api/v1/activity_log_items', payload);
  }
}

