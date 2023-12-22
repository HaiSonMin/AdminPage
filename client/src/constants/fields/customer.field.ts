import { ICustomer } from '@/interfaces/models';
import { baseField } from './base.field';

export const CUSTOMER_FIELD: Partial<ICustomer> = {
  customer_fullName: 'Họ và tên',
  customer_phoneNumber: 'Số điện thoại',
  customer_requirement: 'Yêu cầu khách hàng',
  customer_source: 'Nguồn sự kiện',
  customer_voucher: 'Mã giảm giá',
  ...baseField,
};

console.log('Object.keys(CUSTOMER_FIELD):::', Object.keys(CUSTOMER_FIELD));
