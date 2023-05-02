import { JsonApiClient } from 'services/client/JsonApiClient';
import { ax } from '../util';

export class VehicleLookupService {
  static cached: VehicleParts<VehicleLookupPayload[]>;

  static getLookups = async () => {
    if (this.cached) {
      return this.cached;
    }

    const requests = {
      types: await clientGenerator(VehiclePath.Types).find(),
      lengthRanges: await clientGenerator(VehiclePath.LengthRanges).find(),
      slides: await clientGenerator(VehiclePath.Slides).find(),
      towings: await clientGenerator(VehiclePath.Towings).find(),
      electricals: await clientGenerator(VehiclePath.Electricals).find(),
    };  
    
    const resultsArr = await Promise.all(Object.values(requests));
    const results = Object.fromEntries(Object.keys(requests).map((key, idx) => [key, resultsArr[idx]]));
    const { types, lengthRanges, slides, towings, electricals } = results;
    const lookups = { types, lengthRanges, slides, towings, electricals };
    this.cached = lookups;

    return lookups;
  }

  static getMaps = async () => {
    const results = await this.getLookups();
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


enum VehiclePath {
  Electricals = 'vehicle_electricals',
  Types = 'vehicle_types',
  LengthRanges = 'vehicle_length_ranges',
  Slides = 'vehicle_slides',
  Towings = 'vehicle_towings',
}

export type VehicleMaps = VehicleParts<Map<string, string>>;
export class VehicleLookupPayload {
  id: string;
  abbr: string;
  label: string;
  description: string;
}

const clientGenerator = (path: VehiclePath) => new JsonApiClient(VehicleLookupPayload, ax, path);

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


