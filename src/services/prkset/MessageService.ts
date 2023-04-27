import { JsonApiClient } from 'services/client/JsonApiClient';
import { MessagePayload } from 'services/payloads/MessagePayload';
import { ax } from 'services/util';

const client = new JsonApiClient(MessagePayload, ax, 'messages');
export class MessageService {

  static getById = async (id: string) => {
    return this.getByReservationId(id);
  };
  
  static getByReservationId = async (reservationId: string) => {
    const params = { filter: { reservationId, resourceType: 'Guest' }};
    const result = await client.find(params);
    return result
  };

  static getByGuestId = async (guestId: string) => {
    const params = { filter: { resourceId: guestId, resourceType: 'Guest' }};
    const result = await client.find(params);
    return result;
  };

}
