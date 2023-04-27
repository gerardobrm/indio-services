// import { TableInstance } from 'components/tables/ControlledTable';
// import { Serializer } from 'jsonapi-serializer';
import { MessagePayload } from 'services/payloads/MessagePayload';
import { makeGet } from 'services/util';
// import { makeDelete, makeGet, makeGetForTable, makePatch, makePost } from '../util';

// const serializer = new Serializer('messages', {
//   attributes: MessagePayloadAttributes,
//   keyForAttribute: 'snake_case',
// });

export class MessageService {
  static getById = async (id: string) => {
    return this.getByReservationId(id);
  };

  static applyAction = async (id: string, action: string) => {
    // const payload = serializer.serialize({ id, action });
    // let response: MessagePayload = await makePatch(`/api/v1/messages/${id}`, payload);
    // return response;
  };

  static getByGuestId = async (guestId: string) => {
    let data: MessagePayload[] = await makeGet(`/api/v1/messages?filter[resource_id]=${guestId}&filter[resource_type]=Guest`);
    return data;
  };

  static getByReservationId = async (reservationId: string) => {
    let data: MessagePayload[] = await makeGet(`/api/v1/messages?filter[resource_id]=${reservationId}&filter[resource_type]=Reservation`);
    return data;
  };
}
