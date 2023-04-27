import { OptionItem } from 'interfaces/OptionItem';
import { pick } from 'lodash';
import { makeGet } from '../util';

export class ParkSettingsService {
  // static getBookingDemographics = async (parkId: string) => {
  //   let entities: GenericPayload[] = await makeGet(`/api/v1/booking_demographics?filter[park_id]=${parkId}`);
  //   return entities;
  // }
  // static getBookingMarketSegments = async (parkId: string) => {
  //   let entities: GenericPayload[] = await makeGet(`/api/v1/booking_market_segments?filter[park_id]=${parkId}`);
  //   return entities;
  // }
  // static getBookingMethods = async (parkId: string) => {
  //   let entities: GenericPayload[] = await makeGet(`/api/v1/booking_methods?filter[park_id]=${parkId}`);
  //   return entities;
  // }
  // static getBookingReasons = async (parkId: string) => {
  //   let entities: GenericPayload[] = await makeGet(`/api/v1/booking_reasons?filter[park_id]=${parkId}`);
  //   return entities;
  // }
  // static getBookingSources = async (parkId: string) => {
  //   let entities: GenericPayload[] = await makeGet(`/api/v1/booking_sources?filter[park_id]=${parkId}`);
  //   return entities;
  // }
  // static getReferralSources = async (parkId: string) => {
  //   let entities: GenericPayload[] = await makeGet(`/api/v1/referral_sources?filter[park_id]=${parkId}`);
  //   return entities;
  // }
  static getSiteTypes = async (parkId: string) => {
    let entities: GenericPayload[] = await makeGet(`/api/v1/site_types?filter[park_id]=${parkId}`);
    return entities;
  }
  // static getRateTypes = async (parkId: string) => {
  //   let entities: GenericPayload[] = await makeGet(`/api/v1/rate_types?filter[park_id]=${parkId}`);
  //   return entities;
  // }
  // static getReservationTypes = async (parkId: string) => {
  //   let entities: GenericPayload[] = await makeGet(`/api/v1/reservation_types?filter[park_id]=${parkId}`);
  //   return entities;
  // }
  // static getUnitTypes = async (parkId: string) => {
  //   let entities: GenericPayload[] = await makeGet(`/api/v1/unit_types?filter[park_id]=${parkId}`);
  //   return entities;
  // }
  // static getUnitLengths = async (parkId: string) => {
  //   let entities: GenericPayload[] = await makeGet(`/api/v1/unit_lengths?filter[park_id]=${parkId}`);
  //   return entities;
  // }
  // static getUnitSlides = async (parkId: string) => {
  //   let entities: GenericPayload[] = await makeGet(`/api/v1/unit_slides?filter[park_id]=${parkId}`);
  //   return entities;
  // }
  // static getTowingTypes = async (parkId: string) => {
  //   let entities: GenericPayload[] = await makeGet(`/api/v1/towing_types?filter[park_id]=${parkId}`);
  //   return entities;
  // }

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

const settingNames = {
  // bookingDemographics: [],
  // bookingMarketSegments: [],
  // bookingMethods: [],
  // bookingReasons: [],
  // bookingSources: [],
  // referralSources: [],
  siteTypes: [],
  // rateTypes: [],
  // reservationTypes: [],
  // unitTypes: [],
  // unitLengths: [],
  // unitSlides: [],
  // towingTypes: [],
};

type GenericPayload = {
  id: string,
  name: string,
  code: string,
  displayOrder: number,
  active: boolean,
}
type SettingsKeys = keyof typeof settingNames;
type SettingsType = Record<SettingsKeys, GenericPayload[]>;

export type SettingsOptions = Record<SettingsKeys, OptionItem[]>;
export const settingsOptions = settingNames;
