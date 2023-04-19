import { DiscountPayload } from './DiscountPayload';
import { PayloadBase } from './PayloadBase';

export class RatePayload extends PayloadBase {
  id: string;
  parkId: string;
  siteTypeIds: string[];
  discountIds: string[];
  discounts: DiscountPayload[];
  name: string;
  description: string;
  longDescription: string;
  dailyAmount: number;
  weeklyAmount: number;
  monthlyAmount: number;
  yearlyAmount: number;
  mondayAmount: number;
  tuesdayAmount: number;
  wednesdayAmount: number;
  thursdayAmount: number;
  fridayAmount: number;
  saturdayAmount: number;
  sundayAmount: number;
  overwriteDaily: boolean;
  rateChargeDescription: string;
  active: boolean;
  extraGuestFee: number;
  extraPetFee: number;
  includedGuests: number;
  includedPets: number;
  maxGuests: number;
  maxPets: number;
  createdAt: string;
  updatedAt: string;
}

export const RateAttributes = Object.keys(RatePayload.new());
