import { OptionItem } from 'interfaces/OptionItem';
import { pick } from 'lodash';
import { ax, makeGet } from '../util';
import { JsonApiClient } from 'services/client/JsonApiClient';

class GenericPayload {
  id: string;
  name: string;
  code: string;
  displayOrder: number;
  active: boolean;
}

const client = new JsonApiClient (GenericPayload, ax, 'site_types' );
export class ParkSettingsService {

  static getSiteTypes = async (parkId: string) => {
    const params = { filter: { parkId } };
    const result = await client.find(params);
    return result;
  }
  
  static getAll = async (parkId: string) => {
    const names = Object.keys(settingNames);
    const segments = names.map(x => x.replace(/[A-Z]/g, c => `_${c}`.toLowerCase()));
    const requests = segments.map(async segment => {
      const list = await makeGet(`/api/v1/${segment}?filter[park_id]=${parkId}`);
      const entities = list.map(item => pick(item, ['id', 'name', 'code', 'displayOrder', 'active'])) as GenericPayload[];
      return entities;
    });
    const responses = await Promise.all(requests);
    const result = Object.fromEntries(names.map((key, idx) => [key, responses[idx]])) as SettingsType;
    logValues(names, responses);
    return result;
  }

  static getAllOptions = async (parkId: string) => {
    const allSettings = await ParkSettingsService.getAll(parkId);
    const names = Object.keys(allSettings);
    const values = Object.values(allSettings);
    const entries = names.map((key, idx) => {
      const item = values[idx];
      const options = item.map<OptionItem>(x => ({ label: x.name, value: x.id}));
      return [key, options];
    });
    const allOptions = Object.fromEntries(entries) as SettingsOptions;

    return allOptions;
  }
}

function logValues(names: string[], responses: GenericPayload[][]) {
  const map = Object.fromEntries(names.map((key, idx) => 
    [key, responses[idx].map(x => `(${x.displayOrder})-${x.name}`).join(', ')]
  ));
  console.log(map);
}

const settingNames = { siteTypes: [] };

type SettingsKeys = keyof typeof settingNames;
type SettingsType = Record<SettingsKeys, GenericPayload[]>;

export type SettingsOptions = Record<SettingsKeys, OptionItem[]>;
export const settingsOptions = settingNames;
