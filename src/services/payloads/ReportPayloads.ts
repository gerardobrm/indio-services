export type ReservationReportPayload = {
  id: string;
  parkId: string;
  siteId: string;
  guestId: string;
  confirmationNumber: string;
  guestFullName: string;
  guestPhone: string;
  guestFormattedPhone: string;
  siteName: string;
  status: string;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  total: number;
  balance: number;
  arrivalDate: string;
  departureDate: string;
  checkInTime: string;
  checkOutTime: string;
  notes: string;
  rateType: string;
  rateName: string;
  nights: string;
}

export type ReservationPartialPayload = {
  id: string
  rateId: string
  siteId: string
  guestId: string
  parkId: string
  type: string
  confirmationNumber: string
  number: number
  rateName: string
  rateType: string
  siteName: string
  guestName: string
  numberOfNights: number
  total: number
  balance: number
  arrivalDate: string
  departureDate: string
  status: string
  createdAt: string
  updatedAt: string
}

export type EODReportPayload = {
  id: string;
  date: string;
  chargeList: {
      id: string;
      glAccountCode: string;
      description: string;
      totalCharge: string;
  }[];
  receiptList: {
      id: string;
      receiptType: string;
      description: string;
      totalReceipts: string;
  }[];
  chargeTotal: number,
  receiptTotal: number,
  movement: number,
  creditMovement: number,
  debitMovement: number,
  openingBalance: number,
  closingBalance: number,
};

export type DailyCashPayload = {
  id: string
  parkId: string
  startDate: string
  glAccounts: {
    name: string
    number: string
    amounts: {
      [yyyymmdd: string]: number
    }
    total: number
  }[]
  dailyTotals: {
    [yyyymmdd: string]: number
  }
  createdAt: string
  updatedAt: string
}

export type OccupancyPayload = {
  id: string;
  parkId: string;
  datePeriod: string[];
  siteTypeIds: string[];
  records: {
    id: string;
    type: string;
    name: string;
    parentName: string;
    totalArrival: number;
    totalDeparture: number;
    availNights: number;
    usedNights: number;
    occupancyRate: number;
  }[]
};

export type RevenuePayload = {
  id: string;
  parkId: string;
  datePeriod: string[];
  siteTypeIds: string[];
  records: {
    id: string;
    type: string;
    name: string;
    parentName: string;
    rawRevenue: number;
  }[]
};

export type DebtorsPayload = {
  id: string;
  reservationNumber: string;
  guestName: string;
  guestPhone: string;
  arrivalDate: string;
  current: number;
  days30: number;
  days60: number;
  days90: number;
}

export type InHouseGuestBalancePayload = {
  id: string;
  siteId: string;
  siteTypeId: string;
  surname: string;
  rateType: string;
  confirmationNumber: string;
  siteTypeName: string;
  siteName: string;
  siteLabel: string;
  chargeAmtPaidTo: number;
  balance: number;
  lastPaymentDate: string;
  daysOverdue: number;
}
