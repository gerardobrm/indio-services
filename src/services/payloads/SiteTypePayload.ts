import { UniversalSiteType } from 'interfaces/UniversalSiteType';
import { ParkPayload } from './ParkPayload';
import { PhotoPayload } from './PhotoPayload';

export type SiteTypePayload = {
  id: string;
  park: ParkPayload;
  parkId: string;
  // siteTypeId: string;
  type: string;
  name: string;
  code: string;
  description: string;
  defaultArrivalTime: string;
  defaultDepartureTime: string;
  maxOccupantsPerSiteType: number;
  maxOccupantsPerSiteTypeType: number;
  bookable: boolean;
  bookableBySiteType: boolean;
  active: boolean;
  siteType: SiteTypePayload;
  altName: string;
  altDescription: string;
  primaryPhoto: PhotoPayload;
  primaryPhotoUrl: string;
  primaryPhotoId: string;
  rateSummary: string;
  universalSiteType: UniversalSiteType;
  maxAdults: number;
  maxChildren: number;
  maxPets: number;
  maxOccupancy: number;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

type Keys = keyof SiteTypePayload;
export const SiteTypePayloadAttributes: Keys[] = [
  'parkId', 'type', 'name', 'code', 'description', 'bookable', 'active',
  'altName', 'altDescription', 'primaryPhotoId', 'rateSummary', 'displayOrder',
  'maxAdults', 'maxChildren', 'maxPets', 'maxOccupancy',
];
