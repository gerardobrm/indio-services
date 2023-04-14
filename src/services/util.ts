import { message } from 'antd';
import axios, { AxiosError } from 'axios';
import { TableInstance } from 'components/tables/ControlledTable';
import { Deserializer } from 'jsonapi-serializer';
import { ApiState } from '../hooks/useApiState';

const baseUrl = process.env.REACT_APP_BASE_URL;

const deserializer = new Deserializer({keyForAttribute: 'camelCase'});
const dirMap = { 'ascend': '', 'descend': '-'};

const token = window.sessionStorage.getItem('token');
export const ax = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
});

const handleErrors = (error: AxiosError) => {
  const response = error?.response;
  let detail: string;
  if (response?.status === 401) {
    window.sessionStorage.setItem('lastPathname', window.location.pathname);
    logout();
  }
  if (response?.data) {
    detail = response.data.errors[0].detail;
    message.error('An error occurred: ' + detail);
  } else {
    message.error(error.message);
  }

  throw Error(detail || error.message);
};

const buildParams = (query: string, table: TableInstance) => {
  const { pagination, sorting, search } = table;
  let params = query || '';
  if (search) {
    params += `&filter[q][contains]=${search}`;
  }
  if (pagination) {
    params += `&page[number]=${pagination.current}&page[size]=${pagination.pageSize}`;
  }
  if (sorting && sorting.order) {
    const dir = dirMap[sorting.order];
    params += `&sort=${dir}${sorting.field}`;
  }
  return params;
};

export const makeGetForTable = async <T>(resourceUrl: string, query: string, table: TableInstance) => {
  const token = window.sessionStorage.getItem('token');
  const { setLoading, setPagination } = table.setters;
  let params = buildParams(query, table);
  const url = baseUrl + resourceUrl + (params ? `?${params}` : '');
  let entities = null, total = 0;
  
  try {
    setLoading(true);
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    setLoading(false);
    const json = response.data;
    entities = await deserializer.deserialize(json);
    total = json.meta.total;
    setPagination({...table.pagination, total});
  }
  catch (error: any) {
    setLoading(false);
    handleErrors(error);
  }
  logRequest(table, entities, resourceUrl);
  return entities as T;
};

export const makeGetWithState = async (resourceUrl: string, apiState: ApiState) => {
  return makeRequestWithState('GET', resourceUrl, undefined, apiState);
};
export const makePutWithState = async (resourceUrl: string, payload: any, apiState: ApiState) => {
  const response = makeRequestWithState('PUT', resourceUrl, payload, apiState);
  console.log('makePut:', payload, response);
  return response;
};
export const makePostWithState = async (resourceUrl: string, payload: any, apiState: ApiState) => {
  const response = makeRequestWithState('POST', resourceUrl, payload, apiState);
  console.log('makePost:', payload, response);
  return response;
};

const makeRequestWithState = async (method: 'GET' | 'PUT' | 'POST', resourceUrl: string, payload: any, apiState: ApiState) => {
  const token = window.sessionStorage.getItem('token');
  const setApiState = apiState.setter;
  const needFeedback = ['PUT', 'POST'].includes(method);
  let entities = null;
  
  try {
    setApiState(prev => ({...prev, status: 'pending'}));
    const response = await axios.request({
      url: baseUrl + resourceUrl,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: payload,
    });
    const json = response.data;
    entities = await deserializer.deserialize(json);
    setApiState(prev => ({...prev, status: 'success', value: entities}));
    if (needFeedback) {
      message.success('Data has been saved successfully');
    }
  }
  catch (error: any) {
    console.error(error);
    const data = error.response.data;
    if (data) {
      setApiState(prev => ({...prev, status: 'error', error: data.errors[0].detail}));
      message.error('An error occurred: ' + data.errors[0].detail);
    }
  }
  return entities;
};

export const makeGet = async <T = any>(resourceUrl: string) => {
  return makeRequest<T>('GET', resourceUrl);
};
export const makePut = async <T = any>(resourceUrl: string, payload: any) => {
  return makeRequest<T>('PUT', resourceUrl, payload);
};
export const makePost = async <T = any>(resourceUrl: string, payload: any, requireAuth = true) => {
  return makeRequest<T>('POST', resourceUrl, payload);
};
export const makePatch = async <T = any>(resourceUrl: string, payload: any, requireAuth = true) => {
  return makeRequest<T>('PATCH', resourceUrl, payload);
};

export const makeHackyPost = async (resourceUrl: string) => {
  const token = window.sessionStorage.getItem('token');
  try {
    await axios.post(baseUrl + resourceUrl, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  }
  catch (error: any) {
    handleErrors(error);
  }
};

const makeRequest = async <T>(method: 'GET' | 'PUT' | 'POST' | 'PATCH', resourceUrl: string, payload?: any) => {
  const token = window.sessionStorage.getItem('token');
  let entities = null;
  
  try {
    const response = await axios.request({
      url: baseUrl + resourceUrl,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: payload,
    });
    const json = response.data;
    entities = await deserializer.deserialize(json);
  }
  catch (error: any) {
    handleErrors(error);
  }
  return entities as T;
};

export const makeDelete = async (resourceUrl: string) => {
  const token = window.sessionStorage.getItem('token');
  try {
    await axios.delete(baseUrl + resourceUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
  }
  catch (error: any) {
    console.error(error);
    const data = error.response.data;
    if (data) {
      throw new Error(data.errors[0].detail);
    }
  }
};

export const makeLogin = async <T>(resourceUrl: string, payload: any) => {
  try {
    const response = await axios.post(baseUrl + resourceUrl, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
    const json = response.data;
    const entities = await deserializer.deserialize(json);
    return entities as T;
  }
  catch (error: any) {
    let errorMsg = '';
    const data = error?.response?.data;
    errorMsg = data ? data.errors[0].detail : error.message;
    throw new Error(errorMsg);
  }
};

export const logout = () => {
  window.sessionStorage.removeItem('user');
  window.sessionStorage.removeItem('token');
  window.sessionStorage.removeItem('selectedPark');
  window.sessionStorage.removeItem('selectedClient');
  window.location.href = '/';
};

function logRequest(table: TableInstance<any>, entities: any[], resourceUrl: string) {
  const ti = table;
  console.groupCollapsed(`get: ${resourceUrl.padEnd(30)} - [${ti.pagination.current},${ti.pagination.pageSize},${ti.pagination.total}]`);
  if (entities.length > 0) {
    const cols = Object.keys(entities[0]);
    console.table(entities, cols);
    let type = getPayloadType(entities[0]);
    console.log('Payload', type);
  }
  console.groupEnd();
}

function getPayloadType(payload: any) {
  const entity = Array.isArray(payload) ? payload[0] : payload;
  if (!entity) return;
  
  let unsortedKeys = Object.keys(entity);
  const keys = unsortedKeys.sort((a,b) => a.match(/id$/i) ? a.length : -1).reverse();
  const types = keys.map(key => {
    const objType = Object.prototype.toString.call(entity[key]);
    let type = objType.replace(/\[object (\w+)\]/, '$1').toLowerCase();
    type = ['null', 'undefined'].includes(type) ? 'any' : type;
    type = type === 'array' ? 'any[]' : type;
    return type;
  });
  const lines = keys.map((k,i) => `  ${k}: ${types[i]}`).join('\n');
  const result = `{\n${lines}\n}`;
  return result;
}
