import { TableInstance } from 'components/tables/ControlledTable';
import { LongTermRequestPayload } from './payloads/LongTermRequestPayload';
import { ax } from './util';
import { JsonApiClient } from './client/JsonApiClient';

const client = new JsonApiClient(LongTermRequestPayload, ax, 'long_term_request');

const item = JSON.parse(`{"id":"id0",
  "guest":{"parkId":"fb49009a-ae2d-4ea1-bf98-735a97289762","primaryPaymentMethodId":"a5e92a1e-f106-4268-afe4-97f59ed6cb75","firstName":"Ned","middleName":null,"lastName":"Flanders","fullName":"Flanders, Ned","title":null,"email":"ned.flanders@mail.com","id":"f5edc430-01cc-4e0f-a87f-882acbc7b4b8"},
  "siteTypeId":"37242f50-b804-450a-86ba-010e5b6c9c9c","siteTypeName":"Pull-Thru","dateRange":["2022-01-26T13:43:41.294Z","2022-03-02T13:43:41.294Z"],"vehicleType":"fifth-wheel","vehicleLengthRange":"length-21-30","vehicleTowing":"motorcycle","vehicleSlides":["driver","passenger"],"vehicleElectrical":["20-amp","30-amp"],
  "arrivalDate":"2022-01-26T13:43:41.294Z","departureDate":"2022-03-02T13:43:41.294Z","requestNum":"LTR18990"}`);

export class LongTermRequestService {
  static getById = async (id: string) => {
    const result = await client.getById(id);
    return item;
  }

  static createOrUpdate = async (entity: LongTermRequestPayload) => {
    const result = await client.createOrUpdate(entity);
    return result;
  }

  static find = async (table: TableInstance, parkId: string) => {
    const result = await client.findForTable(table, { parkId });
    return [item];
  }

  static getAll = async (parkId: string) => {
    const params = { filter: { parkId } };
    const result = await client.getAll(params);
    result.entities = [item];
    return result;
  };

  static delete = async (id: string) => {
    await client.delete(id);
  }
}
