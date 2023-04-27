import { TaxTablePayload } from 'services/payloads/TaxTablePayload';
import { makeGet } from 'services/util';

export class TaxTableService {
  static getById = async (id: string) => {
    let entities: TaxTablePayload = await makeGet(`/api/v1/tax_tables/${id}`);
    return entities;
  }

  static getAll = async (parkId: string) => {
    const query = `filter[park_id]=${parkId}`;
    let entities: TaxTablePayload[] = await makeGet(`/api/v1/tax_tables?${query}`);
    return entities;
  }
}
