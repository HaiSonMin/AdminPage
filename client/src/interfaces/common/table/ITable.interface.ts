export interface IBodyTable {
  id?: string;
  dataTable?: Array<IDataBody>;
}

export interface IDataBody {
  columnKey: string;
  columnName: string;
  columnVal: string;
}
