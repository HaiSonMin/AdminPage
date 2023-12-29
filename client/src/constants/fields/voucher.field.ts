import { IVoucher } from '@/interfaces/models';
import { baseField } from './base.field';

export const VOUCHER_FIELD: Partial<IVoucher> = {
  voucher_name: 'Tên voucher',
  voucher_type: 'Loại voucher',
  voucher_value: 'Giá trị voucher',
  voucher_web: 'Nguồn sự kiện',
  ...baseField,
};

const { _id, updatedAt, ...VOUCHER_FIELD_DEF } = VOUCHER_FIELD;
export { VOUCHER_FIELD_DEF };
