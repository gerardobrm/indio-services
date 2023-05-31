import { ax } from './util';
import { JsonApiClient } from './client/JsonApiClient';

class Filter {
  id: string;
  [x: string]: number | string | string[];
}
const client = new JsonApiClient(Filter, ax, 'reservation_filters');

export class ReservationFiltersService {
  static find = async (parkId: string, datePeriod: string[]) => {
    const entity = { id: parkId, datePeriod };
    const entities: Filter = await client.createOrUpdate(entity);
    return entities;
  };
}
