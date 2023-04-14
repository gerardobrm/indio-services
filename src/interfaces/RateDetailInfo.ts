import { RateSummary } from './RateDetails'

export type RateDetailInfo = {
  daily: RateDetailItemInfo,
  weekly: RateDetailItemInfo,
  monthly: RateDetailItemInfo,
  inDetails: RateDetailedItemInfo,
};

export type RateDetailItemInfo = {
  detail: DateKeyRateValue;
  summary: RateSummary[];
  total: number;
  totalCents: number;
};

export type RateDetailedItemInfo = RateDetailInfo | {
  leadingDayTotal: number;
  leadingDayTotalCents: number;
  trailingDayTotal: number;
  trailingDayTotalCents: number;
};

type DateKeyRateValue = Record<string, number>;
