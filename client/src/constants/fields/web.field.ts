import { IWeb } from '@/interfaces/models';
import { baseField } from './base.field';

export const WEB_FIELD: Partial<IWeb> = {
  web_name: 'Tên nguồn sự kiện',
  web_url: 'Link sự kiện',
  ...baseField,
};

const { _id, updatedAt, ...WEB_FIELD_DEF } = WEB_FIELD;
export { WEB_FIELD_DEF };
