export const samplePayload = {
  id: '',
  leadDays: 0,
  nextBookingDate: '',
  minNights: 0,
  maxNights: 0,
  checkInTime: '',
  checkOutTime: '',
  pencilBookingExpirationHours: 0,
  enableOnlineTermsAcceptance: false,
  businessFacilities: '',
  carParking: '',
  description: '',
  directions: '',
  features: '',
  thingsToDo: '',
  unitTypeRequired: false,
  unitTypeVisible: false,
  unitLengthRequired: false,
  unitLengthVisible: false,
  unitSlideRequired: false,
  unitSlideVisible: false,
  towingTypeRequired: false,
  towingTypeVisible: false,
  minAdults: 0,
  maxAdults: 0,
  adultsHelpText: '',
  minChildren: 0,
  maxChildren: 0,
  childrenHelpText: '',
  minInfants: 0,
  maxInfants: 0,
  infantsHelpText: '',
  includeInfantsInChildren: false,
  infantsAllowed: false,
  dailySecurityDeposit: null,
  weeklySecurityDeposit: null,
  monthlySecurityDeposit: null,
  applySecurityDepositToElectrical: false,
  siteLockFee: 0,
  bookingMapMetadata: {},
  bookingMapOriginalFilename: '',
  bookingMapUrl: '',
  bookingMapDataUri: '',
  rateTypes: [],
  gateCode: '',
  // defaultBookingDemographicId: '',
  // defaultBookingMarketSegmentId: '',
  // defaultBookingMethodId: '',
  // defaultBookingReasonId: '',
  // defaultBookingSourceId: '',
  // defaultReferralSourceId: '',
  // defaultSiteTypeId: '',
  // defaultRateTypeId: '',
  // defaultReservationTypeId: '',
  // defaultUnitTypeId: '',
  // defaultUnitLengthId: '',
  // defaultUnitSlideId: '',
  // defaultTowingTypeId: '',
  createdAt: '',
  updatedAt: '',
};

type PartialBy<T, K extends keyof T> = Omit<T, K>

export type ParkSettingPayload = PartialBy<typeof samplePayload, 'createdAt' | 'updatedAt'>;

export class ParkSettingPayloadClass {
  id: string;

  constructor() {
    const instance = Object.assign(this, samplePayload);
    return instance;
  }
};
