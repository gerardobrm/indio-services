export type ClassConstructor<T = any> = {
  new (...args: any[]): T;
};

export type Payload = {
  id: string,
}

type ApiRecord = {
  id: string,
  [k: string]: any
}

export type Data = ApiRecord[] | ApiRecord;

export type Response = {
  data: Data,
  total: number,
}

export type Params = {
  q?: string,
  sort?: string,
  pageNumber?: number,
  pageSize?: number,
  [k: string]: any
}
