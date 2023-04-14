export interface TableInstance<T = any> {
  dataSource: T[];
  pagination: Paging;
  sorting: Sorting;
  loading: boolean;
  search: string;
  options: TableOptions<T>;
  actions: Actions;
  setDataSource(value: T[]): void;
  setters: {
    setLoading(value: boolean): void;
    setPagination(value: Paging): void;
    setSorting(value: Sorting): void;
    setSearch(value: string): void;
  };
}

interface Actions {
  onCreateNew?: () => void;
}

export interface Paging {
  current: number,
  pageSize: number,
  total?: number,
}

export interface Sorting {
  field: string,
  order: string,
}

export type Mapping<T> = {
  [P in keyof T]?: string;
}

export interface TableOptions<T> {
  fieldMapping?: Mapping<T>;
  pageSize?: number;
  showSearch?: boolean;
}
