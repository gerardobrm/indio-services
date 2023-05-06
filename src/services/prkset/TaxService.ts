import { TableInstance } from 'services/interfaces/TableInstance';
import { TaxRatePayload, TaxTablePayload } from 'services/payloads';
import { JsonApiClient } from 'services/client/JsonApiClient';
import { ax } from '../util';

const taxTableclient = new JsonApiClient(TaxTablePayload, ax, 'tax_tables');
const taxRateclient = new JsonApiClient(TaxRatePayload, ax, 'tax_rates');
export class TaxService {

  static getAllTaxRates = async () => {
    const result = await taxRateclient.getAll();
    return result.entities;
  }

  static findTaxRates = async (table: TableInstance) => {
    const result = await taxRateclient.findForTable(table, {});
    return result;
  }

  static createOrUpdate = async (entity: TaxRatePayload) => {
    const result = await taxRateclient.createOrUpdate(entity);
    return result;
  }

  static getAllTaxTables = async (parkId: string) => {
    const result = await taxTableclient.find({ parkId });
    return result;
  }

  static findTaxTables = async (table: TableInstance) => {
    const result = await taxTableclient.findForTable(table, {});
    return result;
  }

  static createOrUpdateTaxTable = async (entity: TaxTablePayload) => {
    const result = await taxTableclient.createOrUpdate(entity);
    return result;
  }
}
