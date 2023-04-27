import { makeGet } from '../util';

export class VehicleLookupService {
  static cached: VehicleParts<VehicleLookupPayload[]>;

  static getElectricals = async () => {
    let entities: VehicleLookupPayload[] = await makeGet('/api/v1/vehicle_electricals');
    return entities;
  }

  static getTypes = async () => {
    let entities: VehicleLookupPayload[] = await makeGet('/api/v1/vehicle_types');
    return entities;
  }

  static getLengthRanges = async () => {
    let entities: VehicleLookupPayload[] = await makeGet('/api/v1/vehicle_length_ranges');
    return entities;
  }

  static getSlides = async () => {
    let entities: VehicleLookupPayload[] = await makeGet('/api/v1/vehicle_slides');
    return entities;
  }

  static getTowings = async () => {
    let entities: VehicleLookupPayload[] = await makeGet('/api/v1/vehicle_towings');
    return entities;
  }

  static getLookups = async () => {
    if (VehicleLookupService.cached) {
      return VehicleLookupService.cached;
    }

    const requests = {
      types: VehicleLookupService.getTypes(),
      lengthRanges: VehicleLookupService.getLengthRanges(),
      slides: VehicleLookupService.getSlides(),
      towings: VehicleLookupService.getTowings(),
      electricals: VehicleLookupService.getElectricals(),
    };  
    const resultsArr = await Promise.all(Object.values(requests));
    const results = Object.fromEntries(Object.keys(requests).map((key, idx) => [key, resultsArr[idx]]));
    const { types, lengthRanges, slides, towings, electricals } = results;
    const lookups = { types, lengthRanges, slides, towings, electricals };
    VehicleLookupService.cached = lookups;

    return lookups;
  }

  static getMaps = async () => {
    const results = await VehicleLookupService.getLookups();
    const maps = convertAllToMap(results);
    return maps;
  }
}

type VehicleParts<T> = {
  types: T;
  lengthRanges: T;
  slides: T;
  towings: T;
  electricals: T;
}

export type VehicleMaps = VehicleParts<Map<string, string>>;

const convertAllToMap = async (values: VehicleParts<VehicleLookupPayload[]>) => {
  const keys = Object.keys(values);
  const entries = keys.map(key => {
    const item = values[key];
    const map = new Map(item.map(x => (
      [ x.id, x.label]
    )));
    return [key, map];
  });
  
  const result = Object.fromEntries(entries) as VehicleMaps;
  return result;
};

export interface VehicleLookupPayload {
  id: string;
  abbr: string;
  label: string;
  description: string;
}
