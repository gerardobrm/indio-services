import { PayloadBase } from './PayloadBase';

export class BrandingSettingsPayload extends PayloadBase {
  id: string;
  logoUrl: string;
  logoDataUri: string;
  faviconUrl: string;
  faviconDataUri: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  font1Id: string;
  font2Id: string;
  font3Id: string;
}

export class PolicySettingPayload extends PayloadBase {
  id: string;
  systemTerms: string;
  cancellationPolicy: string;
  refundPolicy: string;
  petPolicy: string;
  terms: string;
  notes: string;
  parkReminders: string;
}

export class CommunicationSettings {
  id: string;
  parkId: string;
}

export class EmailSettingsPayload extends PayloadBase {
  id: string;
  communicaitonSettingId: string;
  emailType: string;
  senderEmail: string;
  senderEmailName: string;
  ccEmails: string[];
  bccEmails: string[];
  template: string;
  tagNames: string[];
  important: boolean;
}

export class ConversionTracking {
  id: string;
  parkId: string;
  facebookPixel: null;
  googleAnalytics: null;
  googleAdWordsTracking: null;
  googleTagManager: null;
}

export class SocialMedium {
  id: string;
  parkId: string;
  appleMaps: string;
  bingPlaces: string;
  facebook: string;
  goodSam: string;
  googleBusiness: string;
  instagram: string;
  pinterest: string;
  rvParkReviews: string;
  tripAdvisor: string;
  twitter: string;
  yelp: string;
}
