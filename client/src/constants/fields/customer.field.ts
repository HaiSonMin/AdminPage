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

const { _id, updatedAt, customer_requirement, ...CUSTOMER_FIELD_DEF } =
  CUSTOMER_FIELD;
export { CUSTOMER_FIELD_DEF };
