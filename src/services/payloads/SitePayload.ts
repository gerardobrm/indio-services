import { PayloadBase } from './PayloadBase';
import { SiteTypePayload } from './SiteTypePayload';

export class SitePayload extends PayloadBase {
    id: string;
    label: string;
    siteType: SiteTypePayload;
    siteTypeId: string;
    siteTypeName: string;
    siteTypeLabel: string;
    name: string;
    siteNumber: string;
    code: string;
    status: string;
    siteStatus: string;
    sewer: boolean;
    water: boolean;
    metered: boolean;
    length: number;
    amenities: string;
    canBookOnline: boolean;
    description: string;
    extension: string;
    maxOccupants: number;
    interconnecting: boolean;
    active: boolean;
    hasTasks: boolean;
    housekeeping: string;
    housekeepingActions: string[];
    utilities: string;
    utilitiesActions: string[];
    inspection: string;
    inspectionActions: string[];
    action: string;
    taskList: string[];
    lastInspectedBy: string;
    lastInspectedById: string;
    lastInspectedAt: string;
    allowVehicleElectrical: string[];
    allowVehicleLengthRanges: string[];
    allowVehicleSlides: string[];
    allowVehicleVehicleTowing: string[];
    allowVehicleTypes: string[];
    createdAt: string;
    updatedAt: string;
    mostRecentReservation?: {
      id: string,
      confirmationNumber: string,
      arrivalDate: string,
      departureDate: string,
      status: string,
      rateType: string,
    }
};

export class SiteMiniPayload extends PayloadBase {
  id: string;
  name: string;
  label: string;
  siteNumber: string;
  siteType: SiteTypePayload;
  siteTypeId: string;
  siteTypeName: string;
  siteTypeLabel: string;
  allowVehicleElectrical: string[];
  length: number;

  static fields() {
    const instance = new this();
    const keys = Object.keys(instance);
    return keys;
  }
}

export const SitePayloadAttributes = Object.keys(SitePayload.new());
