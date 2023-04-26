import { AxiosInstance, AxiosError } from 'axios';
import { TableInstance } from 'services/interfaces/TableInstance';
import { Serializer } from 'jsonapi-serializer';
import { Deserializer } from 'jsonapi-serializer';
// import { plainToInstance } from 'class-transformer';
import { get, isObject, snakeCase } from 'lodash';
import { logout } from 'services/util';
import { logEntity } from './helpers';
import { Data, Payload, Response, ClassConstructor } from './Types';

export class JsonApiClient<T extends Payload> {
  private api: AxiosInstance;
  private entityCtor: ClassConstructor<T>;
  private resourceName: string;
  private path: string;
  private serializer: any;
  private deserializer: any;

  constructor(ctor: ClassConstructor<T>, api: AxiosInstance, resourceName: string, path?: string) {
    this.api = api;
    this.entityCtor = ctor;
    this.resourceName = resourceName;
    this.path = path || '';
    this.api.interceptors.response.use(
      response => response,
      error => this.handleErrors(error)
    );
    const attributes = Object.keys(new ctor());
    this.serializer = new Serializer(resourceName, { attributes, keyForAttribute: 'snake_case' });
    this.deserializer = new Deserializer({ keyForAttribute: 'camelCase' });
  }

  private handleErrors(error: AxiosError) {
    if (error.response.status === 401) {
      logout();
    }
  }

  private getUrl(params?: JsonApiParams, id?: string) {
    const { resourceName: entityName, path } = this;

    const arr = [`${path}/${entityName}`];
    id && arr.push(`/${id}`);
    params && arr.push(`?${getJsonApiParams(params)}`);

    const url = arr.join('');
    return url;
  }

  private async getData(params?: JsonApiParams) {
    const { api, deserializer, entityCtor } = this;
    const url = this.getUrl(params);
    const response = await api.get(url);
    const data = await deserializer.deserialize(response.data);
    logEntity(data, url);
    const total = response.data.meta.total;
    const array = Array.isArray(data) ? data : [data];
    const entities = plainToInstance(entityCtor, array);
    return { entities, total };
  }

  async find(params?: GenericParams) {
    const filter = params ?? null;
    const jsonParams = this.adaptFilter(filter);
    const { entities } = await this.getData(jsonParams);
    return entities;
  }

  private adaptFilter(params: GenericParams) {
    let result: JsonApiParams = params;
    if (params) {
      const firstKey = Object.keys(params)[0];
      if (firstKey !== 'filter') {
        const entries = Object.entries(params).map(([key, val]) => [snakeCase(key), val]);
        const filter = Object.fromEntries(entries);
        result = { filter };
      }
    }
    return result;
  }

  async findForTable(table: TableInstance, genParams: GenericParams) {
    const params = this.adaptFilter(genParams);
    const { pagination, sorting, search } = table;
    const { setLoading, setPagination } = table.setters;
    const allParams = { ...params,
      page: { size: pagination.pageSize, number: pagination.current }
    };
    if (search) {
      allParams.filter = {q: { contains: search }};
    }
    if (sorting) {
      const dir = (sorting.order.startsWith('desc') ? '-' : '');
      allParams.sort = dir + sorting.field;
    }
    setLoading(true);
    const { entities, total } = await this.getData(allParams);
    setLoading(false);
    setPagination({ ...table.pagination, total: total });
    return entities;
  }

  async findOne(...args: Args) {
    const [filter] = args ?? [];
    const jsonParams = this.adaptFilter(filter);
    const result = await this.getData(jsonParams);
    const data = result.entities;
    const entity = Array.isArray(data) ? data[0] : data;
    return entity;
  }

  async getById(id: string): Promise<T>;
  async getById(id: string, params: JsonApiParams): Promise<T>;
  async getById(id: string, params?: JsonApiParams) {
    const { api, entityCtor } = this;
    const url = this.getUrl(params, id);
    const response = await api.get<Response>(url);
    const data = response.data.data;
    const entities = plainToInstance(entityCtor, data);
    return entities;
  }

  async getAll(params?: JsonApiParams) {
    const query = {
      ...params,
      page: { 
        number: params?.page?.number ?? 1,
        size: 200,
      },
    };
    const data = await this.getData(query);
    return data;
  }

  async createOrUpdate(payload?: T) {
    const { api, entityCtor, resourceName } = this;
    const rawPayload = this.serializer.serialize(payload);
    let data: Data;
    if (payload.id) {
      const response = await api.put<Response>(`${resourceName}/${payload.id}`, rawPayload);
      data = response.data.data;
    }
    else {
      const response = await api.post<Response>(`${resourceName}`, rawPayload);
      data = response.data.data;
    }
    if (isObject(data)) {
      const entities = plainToInstance(entityCtor, data);
      return entities;
    }
  }

  async updatePartial(id: string, payload: Partial<T>) {
    const { api, entityCtor, resourceName } = this;
    const rawPayload = this.serializer.serialize(payload);
    const response = await api.put<Response>(`${resourceName}/${id}`, rawPayload);
    const data = response.data.data;
    if (data) {
      const entities = plainToInstance(entityCtor, data);
      return entities;
    }
  }

  async get<P>(url: string, ctor: ClassConstructor<P>) {
    const response = await this.api.get<Response>(url);
    const data = await this.deserializer.deserialize(response.data);
    const output = plainToInstance(ctor, data);
    return output;
  }

  async post<P>(url: string, payload: any, responseCtor: ClassConstructor<P>) {
    const attributes = Object.keys(payload);
    let japiPayload = this.serializer.serialize(payload);
    if (url) {
      const lastSegment = url.match(/([\w.-]+)(?:\?.+)?/).slice(-1)[0];
      const serializer = new Serializer(lastSegment, { attributes, keyForAttribute: 'snake_case' });
      japiPayload = serializer.serialize(payload);
    }
    const reqURL = url ?? this.getUrl();
    const response = await this.api.post<Response>(reqURL, japiPayload);
    const data = await this.deserializer.deserialize(response.data);
    const output = plainToInstance(responseCtor, data);
    return output;
  }

  async patch(id: string, payload: Partial<T>) {
    const { api, entityCtor, resourceName } = this;
    const rawPayload = this.serializer.serialize(payload);
    const response = await api.patch<Response>(`${resourceName}/${id}`, rawPayload);
    const { data } = response.data;
    if (data) {
      const entities = plainToInstance(entityCtor, data);
      return entities;
    }
  }

  async delete(id: string) {
    const { api, resourceName } = this;
    await api.delete<Response>(`${resourceName}/${id}`);
  }
}

type Args = [arg1?: any, arg2?: any, arg3?: any];

type GenericParams = {
  [k: string]: string | Filter,
  filter?: Filter,
}

type JsonApiParams = {
  sort?: string;
  page?: Paging;
  filter?: Filter;
  extra_fields?: any;
}

type Paging = {
  number?: number,
  size?: number,
}

type Operator = 'contains' | 'eq';

type Filter = {
  [k: string]: any;
  q?: {
    [k in Operator]?: string;
  },
}

function encodeURIQuery(str: string) {
  return encodeURI(str).replace(
    /[/?&=]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

function getJsonApiParams(params: any) {
  if (!params) return '';

  const pathKeys = getPathKeys(params);
  const convert = (path: string) => {
    const segments = path.split('.');
    const result = segments[0] + segments.slice(1).map(seg => `[${seg}]`).join('');
    return result;
  }
  const items = pathKeys.map(path => [convert(path), get(params, path).toString()]);
  const filtered = items.filter(([_,val]) => val?.length > 0);
  const result = filtered.map(([key, val]) => `${key}=${encodeURIQuery(val)}`).join('&');
  return result;
}

function getPathKeys(object: any) {
  const keys = Object.keys(object);
  const paths: string[] = [];
  keys.forEach(key => {
    const value = object[key];
    if (typeof value === 'object') {
      const subKeys = getPathKeys(value);
      const subPaths = subKeys.map(sk => `${key}.${sk}`);
      paths.push(...subPaths);
    }
    else {
      paths.push(key);
    }
  });
  return paths;
};

export function plainToInstance<T, V>(cls: ClassConstructor<T>, plain: V[]): T[];
export function plainToInstance<T, V>(cls: ClassConstructor<T>, plain: V): T;
export function plainToInstance(_: any, data: any) {
  return data;
}
