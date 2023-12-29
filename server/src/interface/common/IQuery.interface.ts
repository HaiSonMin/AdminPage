export interface IQuery {
  limit: number;
  page: number;
  sort: string;
  keySearch: string;
  filters: string;
  numericFilters: string;
  fields: string;
}
