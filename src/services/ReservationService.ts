import { TableInstance } from './interfaces/TableInstance';
import { ReservationPayload, CreateReservationPayload } from './payloads/ReservationPayload';
import { QuotePayload, QuoteResponse } from './payloads/QuotePayload';
import { CalendarEventPayload } from './payloads/CalendarEventPayload';
import { TransactionPayload } from './payloads/TransactionsPayload';
import { SiteHoldPayload } from './payloads/SiteHoldPayload';
import { ax, makeGet, makeHackyPost } from './util';

type Filters = any;
import dayjs from 'dayjs';
import { JsonApiClient } from './client/JsonApiClient';

const reservationSummariesClient = new JsonApiClient(ReservationPayload, ax, 'reservation_summaries');
const reservationClient = new JsonApiClient(ReservationPayload, ax, 'reservations');
const quoteClient = new JsonApiClient(QuotePayload, ax, 'quotes');
const transactionClient = new JsonApiClient(TransactionPayload, ax, 'transactions');
const calendarEventClient = new JsonApiClient(CalendarEventPayload, ax, 'calendar_events');

export class ReservationService {
  static getById = async (id: string) => {
    const result = await reservationSummariesClient.getById(id);
    return result;
  }

  static getSiteHoldById = async (id: string) => {
    let entity: SiteHoldPayload = await makeGet(`/api/v1/reservations/${id}`);
    return entity;
  }

  static getByField = async (field: 'site_id' | 'guest_id', value: string, pageNumber: number, pageSize: number) => {
    const params = {
      filter: { [field]: value },
      page: { number: pageNumber, size: pageSize },
      sort: '-arrival_date',
    }
    const result = await reservationSummariesClient.find(params);
    return result;
  }

  static getQuote = async (quote: QuotePayload) => {
    let entity = await quoteClient.post(null, quote, QuoteResponse);
    // Hack when returns 500
    entity = Array.isArray(entity) ? null : entity;
    return entity;
  }

  static createOrUpdate = async (entity: CreateReservationPayload) => {
    const payload = ReservationPayload.new(entity);
    let response = await reservationSummariesClient.createOrUpdate(payload);
    if (response?.id) {
      // TODO: Hack due API bug
      response = await ReservationService.getById(response.id);
    }
    return response;
  }

  static updatePartial = async (id: string, entity: Partial<ReservationPayload>) => {
    const result = await reservationClient.patch(id, entity);
    const summaryKeys = ['guestSummary', 'vehicleSummary', 'siteSummary', 'rateSummary', 'discountSummary', 'transactionSummaries', 'paymentSummaries'];
    summaryKeys.forEach(key => {
      result[key] = result[key] || {};
    });
    return result;
  }

  static applyAction = async (id: string, action: string) => {
    const payload = { id, action };
    const result = await reservationSummariesClient.updatePartial(id, payload);
    return result;
  }

  static sendConfirmationEmail = async (id: string) => {
    await makeHackyPost(`/api/v1/reservations/${id}/send_confirmation_email`);
  }

  static buildQuery = (
    parkId: string,
    startDate: string,
    todayStatus?: string,
    type?: string[],
    status?: string[],
    siteTypeIds?: string[],
    siteStatus?: string[]
  ) => {
    const params: any = {};

    if (parkId) {
      params.filter = { ...params.filter, parkId };
    }
    if (startDate) {
      params.filter = { ...params.filter, arrivalDate: { gt: startDate } };
    }
    if (todayStatus) {
      params.filter = { ...params.filter, [todayStatus]: dayjs().format('YYYY/MM/DD') };
    }
    if (type?.length > 0) {
      params.filter = { ...params.filter, type };
    }
    if (status?.length > 0) {
      params.filter = { ...params.filter, status };
    }
    if (siteTypeIds?.length > 0) {
      params.filter = { ...params.filter, siteTypeId: siteTypeIds };
    }
    if (siteStatus?.length > 0) {
      params.filter = { ...params.filter, siteTypeStatus: siteStatus };
    }
    return params;
  };


  static getCalendarEvents = async (parkId: string, dateRange: string, search: string) => {
    const params = ReservationService.buildQuery(parkId, null, null, null, null, [], []);
    params.page = { size: 1000 };
    params.filter = { ...params.filter, status: { not_eq: 'cancelled,no_show' } };

    if (dateRange) {
      params.filter = { ...params.filter, in_daterange: { eq: dateRange } };
    }
    if (search) {
      params.filter = { ...params.filter, q: { contains: search } };
    }
    const result = await calendarEventClient.find(params);
    return result;
  }

  static find = async (parkId: string, table: TableInstance, dateRange: string[], filterName: string, filters: Filters) => {
    const { reservationType: type, statusType: status } = filters;
    const { siteType, rateType } = filters;
    const params = { filter: { parkId } };

    if (dateRange && filterName) {
      const dates = { start_date: dateRange[0], end_date: dateRange[1] };
      params.filter[filterName] = JSON.stringify(dates);
    }
    if (type?.length > 0) {
      params.filter['type'] = type.join(',');
    }
    if (status?.length > 0) {
      params.filter['status'] = status.join(',');
    }
    if (siteType?.length > 0) {
      params.filter['siteTypeId'] = siteType.join(',');
    }
    if (rateType?.length > 0) {
      params.filter['rateType'] = rateType.join(',');
    }

    if (!table.sorting) {
      table.setters.setSorting({ field: 'created_at', order: 'descend' });
    }
    const result = await reservationSummariesClient.findForTable(table, params);
    return result;
  }

  static getAll = async (parkId: string, search: string) => {
    const params = {
      filter: { parkId, q: { contains: search } },
      page: { number: 1, size: 10 },
    }
    const result = await reservationSummariesClient.getAll(params);
    return result.entities;
  }

  static getTransactions = async (id: string) => {
    const params = {
      filter: { reservationId: id, voided: false },
      page: { number: 1, size: 10 },
      sort: 'created_at',
    }
    const result = await transactionClient.find(params);
    return result;
  }
}
