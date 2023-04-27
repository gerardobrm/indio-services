import { TableInstance } from 'services/interfaces/TableInstance';
import { makeGet, makeGetForTable, makePost, makePut } from '../util';
import { TaxRatePayload, TaxRatePayloadAttributes, TaxTablePayload, TaxTablePayloadAttributes } from 'services/payloads';
import { Serializer } from 'jsonapi-serializer';

const taxTableSerializer = new Serializer('tax_tables', {
  attributes: TaxTablePayloadAttributes, keyForAttribute: 'snake_case'
});

const taxRateSerializer = new Serializer('tax_rates', {
  attributes: TaxRatePayloadAttributes, keyForAttribute: 'snake_case'
});

export class TaxService {
  static getAllTaxRates = async () => {
    const data: TaxRatePayload[] = await makeGet('/api/v1/tax_rates');
    return data;
  }

  static findTaxRates = async (table: TableInstance) => {
    const data = await makeGetForTable<TaxRatePayload[]>('/api/v1/tax_rates', '', table);
    return data;
  }

  static createOrUpdateTaxRate = async (entity: TaxRatePayload) => {
    const payload = taxRateSerializer.serialize(entity);
    if (entity.id) {
      await makePut(`/api/v1/tax_rates/${entity.id}`, payload);
    } else {
      await makePost('/api/v1/tax_rates', payload);
    }
  }

  static getAllTaxTables = async (parkId: string) => {
    const data: TaxTablePayload[] = await makeGet(`/api/v1/tax_tables?filter[park_id]=${parkId}`);
    return data;
  }

  static findTaxTables = async (table: TableInstance) => {
    const data = await makeGetForTable<TaxTablePayload[]>('/api/v1/tax_tables', '', table);
    return data;
  }

  static createOrUpdateTaxTable = async (entity: TaxTablePayload) => {
    const payload = taxTableSerializer.serialize(entity);
    if (entity.id) {
      await makePut(`/api/v1/tax_tables/${entity.id}`, payload);
    } else {
      await makePost('/api/v1/tax_tables', payload);
    }
  }
}
