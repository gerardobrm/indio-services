import { TableInstance } from '../interfaces/TableInstance';
import { Serializer } from 'jsonapi-serializer';
import { SiteMiniPayload, SitePayload, SitePayloadAttributes } from '../payloads/SitePayload';
import { makeGet, makePut, makePost, makeGetForTable } from '../util';
import { isEqual, snakeCase } from 'lodash';
import dayjs from 'dayjs';

const serializer = new Serializer('sites', {
  attributes: SitePayloadAttributes, keyForAttribute: 'snake_case'
});

export class SiteService {
  static getById = async (id: string) => {
    let entity: SitePayload = await makeGet(`/api/v1/sites/${id}`);
    return entity;
  }

  static create = async (entity: SitePayload) => {
  }
  static update = async (id: number, entity: SitePayload) => {
  }

  static createOrUpdate = async (entity: SitePayload) => {
    const payload = serializer.serialize(entity);
    if (entity.id) {
      await makePut(`/api/v1/sites/${entity.id}`, payload);
    } else {
      await makePost('/api/v1/sites', payload);
    }
  }

  static fieldBulkUpdate = async (ids: string[], fields: Partial<SitePayload>) => {
    const promises = ids.map(async id => {
      const payload = serializer.serialize({ id, ...fields });
      await makePut(`/api/v1/sites/${id}`, payload);
    });
    await Promise.all(promises);
  }

  static getAll = async (parkId: string, siteTypeId?: string) => {
    let query = `filter[park_id]=${parkId}&sort=site_number&page[size]=200`;
    if (siteTypeId) {
      query = query + `&filter[site_type_id]=${siteTypeId}`;
    }
    let entities: SitePayload[] = await makeGet(`/api/v1/sites?${query}`);
    return entities;
  }

  static getMaxSiteNumber = async (parkId: string, siteTypeId?: string) => {
    let query = `filter[park_id]=${parkId}&sort=-site_number&page[size]=5`;
    query = query + '&fields[sites]=name,site_number,site_type_id';
    if (siteTypeId) {
      query = query + `&filter[site_type_id]=${siteTypeId}`;
    }
    let entities: SitePayload[] = await makeGet(`/api/v1/sites?${query}`);
    const lastNumbers = entities.map(x => x.siteNumber).filter(x => x.match(/^\d+$/));
    const max = Math.max(0, ...lastNumbers.map(x => +x));
    return max;
  }

  static getAllLookup = async (parkId: string, siteTypeId?: string) => {
    const fields = SiteMiniPayload.fields().map(snakeCase);
    let query = `fields[sites]=${fields.join(',')}&filter[park_id]=${parkId}&sort=site_number&page[size]=200`;
    if (siteTypeId) {
      query = query + `&filter[site_type_id]=${siteTypeId}`;
    }
    let entities: SiteMiniPayload[] = await makeGet(`/api/v1/sites?${query}`);
    return entities;
  }

  static getDrawerInfo = async (sideId: string) => {
    const query = `/api/v1/sites/${sideId}?extra_fields[sites]=most_recent_reservation`;
    let entities: SitePayload = await makeGet(query);
    return entities;
  }

  static find = async (parkId: string, table: TableInstance) => {
    let query = `filter[park_id]=${parkId}`;
    if (table.search) {
      query += `&filter[q][contains]=${table.search}`;
    }
    if (!table.sorting) {
      table.setters.setSorting({field: 'site_number', order: 'ascend'});
    }
    let entities: SitePayload[] = await makeGetForTable('/api/v1/sites', query, table);
    return entities;
  }

  static findWithWorkarround = async (parkId: string, table: TableInstance) => {
    let query = `filter[park_id]=${parkId}&sort=site_number&page[size]=200`;
    if (table.search) {
      query += `&filter[q][contains]=${table.search}`;
    }
    table.setters.setLoading(true);
    let entities: SitePayload[] = await makeGet(`/api/v1/sites?${query}`);
    const sortedSites = sortSitesByNumber(entities);
    console.log('Site sorting is ', isEqual(entities, sortedSites) ? 'OK' : 'BAD');
    console.log('Sample', sortedSites.map(x => x.name).slice(0, 10));
    console.log('Desc', sortedSites.map(x => x.description));
    const start = (table.pagination.current - 1) * table.pagination.pageSize;
    const end = (table.pagination.current) * table.pagination.pageSize;
    table.setters.setPagination({...table.pagination, total: sortedSites.length});
    table.setters.setLoading(false);
    const result = sortedSites.slice(start, end);
    return result;
  }

  static getAvailabilities = async (start: dayjs.Dayjs, end: dayjs.Dayjs, siteTypeId?: string, ignoredReservationIds?: string[]) => {
    const dateRange = `${start.format('YYYY-MM-DD')}...${end.format('YYYY-MM-DD')}`;
    const filterValue = { date_range: dateRange, ignored_reservation_ids: ignoredReservationIds };
    let query = `filter[site_type_id]=${siteTypeId}&sort=site_number&page[size]=200`;
    query += `&filter[available_between]=${JSON.stringify(filterValue)}`;
    let entities: SitePayload[] = await makeGet(`/api/v1/sites?${query}`);
    return entities;
  }
}

// Workarround due backend is not sorting
function sortSitesByNumber(entities: SitePayload[]) {
  const result = entities
    .map(item => {
      let sorterField = item.siteNumber.replace(/\d+/, (num) => num.padStart(4, '0'));
      sorterField = `${item.siteTypeName.slice(0,3)}_${sorterField}`;
      return { ...item, sorterField };
    })
    .sort((a, b) => a.sorterField.localeCompare(b.sorterField));

  return result;
}
