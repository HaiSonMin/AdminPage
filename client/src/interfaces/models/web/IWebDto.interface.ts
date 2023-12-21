import { IWeb } from './IWeb.interface';

export interface IWebCreateDto extends Pick<IWeb, 'web_name' | 'web_url'> {}
export interface IWebUpdateDto extends Partial<IWebCreateDto> {}
