import { BrandingSettingsPayload } from './ParkPayload.extra';

export class ParkPayload {
  id: string;
  code: string;
  active: boolean;
  address: string;
  address2: string;
  address3: string;
  address4: string;
  brandingSetting: BrandingSettingsPayload;
  city: string;
  clientId: string;
  country: string;
  description: string;
  email: string;
  emailDisplayName: string;
  homepageUrl: string;
  lat: string;
  lng: string;
  name: string;
  nextBookingDate: string;
  phone: string;
  phone2: string;
  postalCode: string;
  state: string;
  timeZone: string;
  createdAt: string;
  updatedAt: string;
}
