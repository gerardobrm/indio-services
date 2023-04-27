import { JsonApiClient } from 'services/client/JsonApiClient';
import { ax } from '../util';

export class VehicleLookupService {
  static cached: VehicleParts<VehicleLookupPayload[]>;

  static getElectricals = async () => {
    const client = clientGenerator(VehiclePath.Electricals);
    const result = await client.find();
    return result;
  }

  static getTypes = async () => {
    const client = clientGenerator(VehiclePath.Types);
    const result = await client.find();
    return result;
  }

  static getLengthRanges = async () => {
    const client = clientGenerator(VehiclePath.LengthRanges);
    const result = await client.find();
    return result;
  }

  static getSlides = async () => {
    const client = clientGenerator(VehiclePath.Slides);
    const result = await client.find();
    return result;
  }

  static getTowings = async () => {
    const client = clientGenerator(VehiclePath.Towings);
    const result = await client.find();
    return result;
  }


  static getLookups = async () => {
    if (this.cached) {
      return this.cached;
    }

    const requests = {
      types: this.getTypes(),
      lengthRanges: this.getLengthRanges(),
      slides: this.getSlides(),
      towings: this.getTowings(),
      electricals: this.getElectricals(),
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


