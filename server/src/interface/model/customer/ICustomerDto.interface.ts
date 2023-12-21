import { ICustomer } from './ICustomer.interface';

export interface ICustomerCreateDto
  extends Pick<
    ICustomer,
    | 'customer_fullName'
    | 'customer_phoneNumber'
    | 'customer_requirement'
    | 'customer_source'
  > {}

export interface ICustomerUpdateDto extends Partial<ICustomer> {}

export interface ICustomerAddVoucherDto
  extends Pick<ICustomer, 'customer_voucher' | 'customer_phoneNumber'> {}
