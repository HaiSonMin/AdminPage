export interface IQuery {
  limit: number;
  page: number;
  sort: string;
  search: string;
  filters: string;
  numericFilters: string;
  fields: string;
}
