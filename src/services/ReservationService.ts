import { JsonApiClient } from './client/JsonApiClient';
import { TableInstance } from './interfaces/TableInstance';
import { Serializer } from 'jsonapi-serializer';
import { ReservationPayload, CreateReservationPayload, CreateReservationPayloadAttributes, CreateReservationResponse } from './payloads/ReservationPayload';
import { QuotePayload, QuoteResponse } from './payloads/QuotePayload';
import { CalendarEventPayload } from './payloads/CalendarEventPayload';
import { TransactionPayload } from './payloads/TransactionsPayload';
import { SiteHoldPayload } from './payloads/SiteHoldPayload';
import { ax, makeGet, makeGetForTable, makeHackyPost, makePatch, makePut } from './util';
// import { Filters } from 'view-components/dropdowns/models/Filters';
type Filters = any;
import dayjs from 'dayjs';

const client = new JsonApiClient(ReservationPayload, ax, 'reservation_summaries');
const quoteClient = new JsonApiClient(QuotePayload, ax, 'quotes');
const transactionClient = new JsonApiClient(TransactionPayload, ax, 'transactions');

const serializer = new Serializer('reservation', {
  attributes: CreateReservationPayloadAttributes, keyForAttribute: 'snake_case'
});

export class ReservationService {
  static getById = async (id: string) => {
    const result = await client.getById(id);
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
    const result = await client.find(params);
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
    let response = await client.createOrUpdate(payload);
    if (response?.id) {
      // TODO: Hack due API bug
      response = await ReservationService.getById(response.id);
    }
    return response;
  }

  static updatePartial = async (id: string, entity: Partial<ReservationPayload>) => {
    const payload = serializer.serialize(entity);
    console.log('service', payload);
    try {
      let response: ReservationPayload = await makePut(`/api/v1/reservations/${id}`, payload);
      // TODO: Hack due API bug
      const summaryKeys = ['guestSummary', 'vehicleSummary', 'siteSummary', 'rateSummary', 'discountSummary', 'transactionSummaries', 'paymentSummaries'];
      summaryKeys.forEach(key => {
        response[key] = response[key] || {};
      });

      return response;
    } catch {};
  }

  static applyAction = async (id: string, action: string) => {
    const payload = { id, action };
    const result = await client.updatePartial(id, payload);
    return result;
  }

  static sendConfirmationEmail = async (id: string) => {
    await makeHackyPost(`/api/v1/reservations/${id}/send_confirmation_email`);
  }

  static buildQuery = (parkId: string, startDate: string, todayStatus?: string, 
    type?: string[], status?: string[], siteTypeIds?: string[], siteStatus?: string[]
  ) => {
    const values = [];
    const today = dayjs().format('YYYY/MM/DD');

    if (parkId) {
      values.push(`filter[park_id]=${parkId}`);
    }
    if (startDate) {
      values.push(`filter[arrival_date][gt]=${startDate}`);
    }
    if (todayStatus) {
      values.push(`filter[${todayStatus}]=${today}`);
    }

    if (type?.length > 0) {
      values.push(`filter[type]=${type.join(',')}`);
    }
    if (status?.length > 0) {
      values.push(`filter[status]=${status.join(',')}`);
    }

    if (siteTypeIds?.length > 0) {
      values.push(`filter[site_type_id]=${siteTypeIds.join(',')}`);
    }
    if (siteStatus?.length > 0) {
      values.push(`filter[site_type_status]=${siteStatus.join(',')}`);
    }

    const query = values.join('&');
    return query;
  }

  static getCalendarEvents = async (parkId: string, dateRange: string, search: string) => {
    let query = ReservationService.buildQuery(parkId, null, null, null, null, [], []);
    query += '&page[size]=1000&filter[status][not_eq]=cancelled,no_show';
    if (dateRange) {
      query += `&filter[in_daterange][eq]=${dateRange}`;
    }
    if (search) {
      query += `&filter[q][contains]=${search}`;
    }

    let entities: CalendarEventPayload[] = await makeGet(`/api/v1/calendar_events?${query}`);
    return entities;
  }

  static find = async (parkId: string, table: TableInstance, dateRange: string[], filterName: string, filters: Filters) => {
    const { reservationType: type, statusType: status } = filters;
    const { siteType, rateType } = filters;

    const values = [];
    values.push(`filter[park_id]=${parkId}`);
    if (dateRange && filterName) {
      const dates = { 
        start_date: dateRange[0],
        end_date: dateRange[1],
      }
      const jsonDates = JSON.stringify(dates);
      values.push(`filter[${filterName}]=${jsonDates}`);
    }
    if (type?.length > 0) {
      values.push(`filter[type]=${type.join(',')}`);
    }
    if (status?.length > 0) {
      values.push(`filter[status]=${status.join(',')}`);
    }
    if (siteType?.length > 0) {
      values.push(`filter[site_type_id]=${siteType.join(',')}`);
    }
    if (rateType?.length > 0) {
      values.push(`filter[rate_type]=${siteType.join(',')}`);
    }
    const query = values.join('&');

    if (!table.sorting) {
      table.setters.setSorting({field: 'created_at', order: 'descend'});
    }
    let entities: ReservationPayload[] = await makeGetForTable('/api/v1/reservation_summaries', query, table);
    return entities;
  }

  static getAll = async (parkId: string, search: string) => {
    const params = {
      filter: { parkId, q: { contains: search } },
      page: { number: 1, size: 10 },
    }
    const result = await client.getAll(params);
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
