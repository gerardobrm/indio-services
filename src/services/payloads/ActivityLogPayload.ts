import { PayloadBase } from './PayloadBase';

export class ActivityLogPayload extends PayloadBase {
  id: string
  activityLoggableId: string
  activityLoggableType: ActivityLoggableType
  creatorId: string
  comment: string
  occurredAt: string
  createdAt: string
  updatedAt: string
  creatorEmail: string
  creatorFirstName: string
  creatorLastName: string
  creatorFullName: string
  creatorMiddleName: null
  type: ActivityLogType
}

export enum ActivityLogType {
  Comment = 'Comment',
  SystemEvent = 'SystemEvent',
  LifeCycleEvent = 'LifeCycleEvent'
}

export enum ActivityLoggableType {
  Guest = 'Guest',
  Reservation = 'Reservation',
  Site = 'Site'
}

export const ActivityLogPayloadAttributes = Object.keys(ActivityLogPayload.new());
