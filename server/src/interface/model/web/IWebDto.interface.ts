import { IWeb } from './IWeb.interface';

export interface IWebDto extends Pick<IWeb, 'web_name' | 'web_url'> {}
