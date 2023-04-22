import { SiteMiniPayload, SitePayload } from './payloads/SitePayload';
import { TableInstance } from './interfaces/TableInstance';
import { JsonApiClient } from './client/JsonApiClient';
import { snakeCase } from 'lodash';
import { ax } from './util';
import dayjs from 'dayjs';

const client = new JsonApiClient(SitePayload, ax, 'sites');

export class SiteService {

  static getById = async (id: string) => {
    const result = await client.getById(id);
    return result;
  }

  static createOrUpdate = async (entity: SitePayload) => {
    const result = await client.createOrUpdate(entity);
    return result;
  }

  static fieldBulkUpdate = async (ids: string[], fields: Partial<SitePayload>) => {
    const promises = ids.map(async id => {
      await client.updatePartial(id, { id, ...fields })
    });
    await Promise.all(promises);
  }

  static getAll = async (parkId: string, siteTypeId?: string) => {
    const params = {
      filter: { parkId, ...(siteTypeId && { siteTypeId })},
      sort: 'site_number',
      page: { size: 200 },
    };
    const result = await client.getAll(params);
    return result.entities;
  };

  static getMaxSiteNumber = async (parkId: string, siteTypeId?: string) => {
    const params = {
      filter: { parkId },
      sort: '-site_number',
      page: { size: 5 },
      fields: { sites: 'name,site_number,site_type_id' }
    }
    if (siteTypeId) {
      params.filter['siteTypeId'] = siteTypeId;
    }
    const result = await client.getAll(params);
    const lastNumbers = result.entities.map(x => x.siteNumber).filter(x => x.match(/^\d+$/));
    const max = Math.max(0, ...lastNumbers.map(x => +x));
    return max;
  }

  static getAllLookup = async (parkId: string, siteTypeId?: string) => {
    const fields = SiteMiniPayload.fields().map(snakeCase);
    const params = {
      filter: { parkId },
      sort: 'site_number',
      page: { size: 200 },
      fields: { sites: fields.join(',') }
    };
    if (siteTypeId) {
      params.filter['siteTypeId'] = siteTypeId;
    }
    const result = await client.getAll(params);
    return result.entities;
  }

  static getDrawerInfo = async (siteId: string) => {
    const params = {
      extra_fields: { sites: 'most_recent_reservation' }
    }
    const result = await client.getById(siteId, params);
    return result;
  }

  static find = async (parkId: string, table: TableInstance) => {
    if (!table.sorting) {
      table.setters.setSorting({ field: 'created_at', order: 'descend' });
    }
    const result = await client.findForTable(table, { parkId });
    return result
  }

  static findWithWorkarround = async (parkId: string, table: TableInstance) => {
    table.setters.setLoading(true);
    const params = {
      filter: { parkId },
      sort: 'site_number',
      page: { size: 200 },
    };

    if (table.search) {
      params.filter['q'] = { contains: table.search }
    }
    const { entities } = await client.getAll(params);
    const sortedSites = sortSitesByNumber(entities);
    const start = (table.pagination.current - 1) * table.pagination.pageSize;
    const end = (table.pagination.current) * table.pagination.pageSize;
    table.setters.setPagination({ ...table.pagination, total: sortedSites.length });
    table.setters.setLoading(false);
    const result = sortedSites.slice(start, end);
    return result;
  }

  static getAvailabilities = async (start: dayjs.Dayjs, end: dayjs.Dayjs, siteTypeId?: string, ignoredReservationIds?: string[]) => {
    const dateRange = `${start.format('YYYY-MM-DD')}...${end.format('YYYY-MM-DD')}`;
    const filterValue = { date_range: dateRange, ignored_reservation_ids: ignoredReservationIds };
    const params = {
      filter: {
        siteTypeId,
        availableBetween: JSON.stringify(filterValue)
      },
      sort: 'site_number',
      page: { size: 200 },

    }
    const result = await client.getAll(params);
    return result.entities;
  }
}

// Workarround due backend is not sorting
function sortSitesByNumber(entities: SitePayload[]) {
  const result = entities
    .map(item => {
      let sorterField = item.siteNumber.replace(/\d+/, (num) => num.padStart(4, '0'));
      sorterField = `${item.siteTypeName.slice(0, 3)}_${sorterField}`;
      return { ...item, sorterField };
    })
    .sort((a, b) => a.sorterField.localeCompare(b.sorterField));

  return result;
}
