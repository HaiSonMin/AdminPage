export interface IApi<T> {
  metadata?: T;
  message?: string;
  reasonStatusCode?: string;
  statusCode?: number;
}
