import { EQuery } from '@/enums';

export interface IQuery {
  [EQuery.SORT]: string;
  [EQuery.PAGE]: number;
  [EQuery.LIMIT]: number;
  [EQuery.FIELDS]: string;
  [EQuery.FILTERS]: string;
  [EQuery.KEY_SEARCH]: string;
  [EQuery.NUMERIC_FILTERS]: string;
}
